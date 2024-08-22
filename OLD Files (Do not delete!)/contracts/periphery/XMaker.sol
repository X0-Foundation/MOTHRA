// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import "../session/Node.sol";
import "../libraries/WireLibrary.sol";
import "./interfaces/IXMaker.sol";
import "../session/SessionManager.sol";
import "./interfaces/IControlCenter.sol";
import "../libraries/utils/TransferHelper.sol";
import "../libraries/XLibrary.sol";
import "../libraries/math/SafeMath.sol";
import "../core/interfaces/IXFactory.sol";
import "./interfaces/IWETH.sol";

import "hardhat/console.sol";

interface IBalanceLedger {
    function balanceOf(address account) external view returns (uint);
}

contract XMaker is Node, IXMaker, Ownable, SessionManager {
    using SafeMath for uint;

    address public immutable override WETH;

    string private sForbidden = "XTaker: Forbidden";
    string private sInvalidPath = "XTaker: Invalid path";
    string private sInsufficientOutput = "XTaker: Insufficient output amount";
    string private sInsufficientA = "XTaker: Insufficient A amount";
    string private sInsufficientB = "XTaker: Insufficient B amount";
    string private sExcessiveInput = "XTaker: Excessive input amount";
    string private sExpired = "XTaker: Expired";

    modifier ensure(uint deadlineBNumber) {
        require(deadlineBNumber >= block.number, sExpired);
        _;
    }

    constructor(address _WETH) Ownable() Node(NodeType.Maker) {
        WETH = _WETH;

        trackFeeStores = true;
        trackFeeRates = true;
        trackPairStatus = true;
    }

    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }

    function getOwner() public view override returns (address) {
        return owner();
    }

    function setNode(
        NodeType nodeType,
        address node,
        address caller
    ) public virtual override wired {
        super.setNode(nodeType, node, caller);
        if (nodeType == NodeType.Token) {
            sessionRegistrar = ISessionRegistrar(node);
            sessionFees = ISessionFees(node);
        }
    }

    function getReserveOnETHPair(address _token) external view virtual override returns (uint reserve) {
        (uint reserve0, uint reserve1) = XLibrary.getReserves(nodes.factory, _token, WETH);
        (address token0, ) = XLibrary.sortTokens(_token, WETH);
        reserve = token0 == _token ? reserve0 : reserve1;
    }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        // Get amounts to transfer to the pair fee of fees.
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {

        if (IXFactory(nodes.factory).getPair(tokenA, tokenB) == address(0)) {
            IXFactory(nodes.factory).createPair(tokenA, tokenB);
        }
        (uint reserveA, uint reserveB) = XLibrary.getReserves(nodes.factory, tokenA, tokenB);

        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = XLibrary.quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, sInsufficientB);
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = XLibrary.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, sInsufficientA);
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }

        require(amountA >= amountAMin, sInsufficientA);
        require(amountB >= amountBMin, sInsufficientB);
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber
    )
        external
        virtual
        override
        ensure(deadlineBNumber)
        returns (
            uint amountA,
            uint amountB,
            uint liquidity
        )
    {
        _openAction(ActionType.AddLiquidity, true);

        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);

        address pair = pairFor[tokenA][tokenB];
        _checkEnlisted(pair);

        XLibrary.lightTransferFrom(tokenA, msg.sender, pair, amountA, nodes.token);
        XLibrary.lightTransferFrom(tokenB, msg.sender, pair, amountB, nodes.token);
        liquidity = IXPair(pair).mint(address(this));

        if (tokenA == nodes.token || tokenB == nodes.token) liquidity -= _payTransactionFeeLP(pair, liquidity);
        TransferHelper.safeTransfer(pair, to, liquidity);

        _closeAction();
    }

    function wired_addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber
    )
        external
        virtual override ensure(deadlineBNumber)
        returns (uint amountA, uint amountB, uint liquidity)
    {
        require(_msgSender() == nodes.token, sForbidden);

        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);

        address pair = pairFor[tokenA][tokenB];
        _checkEnlisted(pair);

        XLibrary.lightTransferFrom(tokenA, msg.sender, pair, amountA, nodes.token);
        XLibrary.lightTransferFrom(tokenB, msg.sender, pair, amountB, nodes.token);
        liquidity = IXPair(pair).mint(address(this));

        if (tokenA == nodes.token || tokenB == nodes.token) liquidity -= _payTransactionFeeLP(pair, liquidity);
        TransferHelper.safeTransfer(pair, to, liquidity);
    }

    function _payTransactionFeeLP(address lp, uint principal) internal virtual returns (uint feesPaid) {
        if (actionParams.isUserAction) {
            feesPaid = XLibrary.transferFeesFrom(lp, address(this), principal, feeRates[actionParams.actionType], feeStores, nodes.token);
        }
    }

    function addLiquidityETH(
        address _token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber
    )
        external
        payable
        virtual
        override
        ensure(deadlineBNumber)
        returns (
            uint amountToken,
            uint amountETH,
            uint liquidity
        )
    {
        _openAction(ActionType.AddLiquidity, true);

        (amountToken, amountETH) = _addLiquidity(
            _token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = pairFor[_token][WETH];
        _checkEnlisted(pair);

        XLibrary.lightTransferFrom(_token, msg.sender, pair, amountToken, nodes.token);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
        liquidity = IXPair(pair).mint(address(this)); // all arrive.
        if (_token == nodes.token) liquidity -= _payTransactionFeeLP(pair, liquidity);
        TransferHelper.safeTransfer(pair, to, liquidity);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);

        _closeAction();
    }

    // **** REMOVE LIQUIDITY ****
    function _removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to
    ) internal virtual returns (uint amountA, uint amountB) {
        address pair = pairFor[tokenA][tokenB];

        PairSnapshot memory pairSnapshot = PairSnapshot(pair, address(0), address(0), 0, 0, 0, 0);
        (pairSnapshot.reserve0, pairSnapshot.reserve1, ) = IXPair(pair).getReserves();
        IControlCenter(nodes.center).capturePairStateAtSessionDetect(actionParams.session, pairSnapshot); // Liquidity control

        if (IXPair(pair).balanceOf(msg.sender) < liquidity) {
            liquidity = IXPair(pair).balanceOf(msg.sender);
        }

        TransferHelper.safeTransferFrom(pair, msg.sender, address(this), liquidity);
        if (tokenA == nodes.token || tokenB == nodes.token) liquidity -= _payTransactionFeeLP(pair, liquidity);
        TransferHelper.safeTransfer(pair, pair, liquidity);
        (uint amount0, uint amount1) = IXPair(pair).burn(to);

        (pairSnapshot.reserve0, pairSnapshot.reserve1, ) = IXPair(pair).getReserves();
        if (msg.sender != owner()) IControlCenter(nodes.center).ruleOutInvalidLiquidity(pairSnapshot); // Liquidity control

        (pairSnapshot.token0, pairSnapshot.token1) = XLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == pairSnapshot.token0 ? (amount0, amount1) : (amount1, amount0);

        require(amountA >= amountAMin, sInsufficientA);
        require(amountB >= amountBMin, sInsufficientB);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountA, uint amountB) {
        _openAction(ActionType.RemoveLiquidity, true);

        (amountA, amountB) = _removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to);

        _closeAction();
    }

    function wired_removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountA, uint amountB) {
        require(_msgSender() == nodes.token, sForbidden);

        (amountA, amountB) = _removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to);
    }

    function sim_removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity
    ) external view virtual override returns (uint amountA, uint amountB) {
        address pair = pairFor[tokenA][tokenB];

        if (IXPair(pair).balanceOf(msg.sender) < liquidity) {
            liquidity = IXPair(pair).balanceOf(msg.sender);
        }

        (uint amount0, uint amount1) = IXPair(pair).sim_burn(liquidity);

        (address token0, ) = XLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
    }

    function removeLiquidityETH(
        address _token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountToken, uint amountETH) {
        _openAction(ActionType.RemoveLiquidity, true);

        (amountToken, amountETH) = _removeLiquidity(
            _token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this)
        );
        XLibrary.lightTransferFrom(_token, address(this), to, amountToken, nodes.token);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);

        _closeAction();
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = pairFor[tokenA][tokenB];
        uint value = approveMax ? type(uint).max : liquidity;
        IXPair(pair).permit(msg.sender, address(this), value, deadlineBNumber, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadlineBNumber);
    }

    function removeLiquidityETHWithPermit(
        address _token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = pairFor[_token][WETH];
        uint value = approveMax ? type(uint).max : liquidity;
        IXPair(pair).permit(msg.sender, address(this), value, deadlineBNumber, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(_token, liquidity, amountTokenMin, amountETHMin, to, deadlineBNumber);
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****

    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address _token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountETH) {
        _openAction(ActionType.RemoveLiquidity, true);

        uint balance0 = IERC20(_token).balanceOf(address(this));
        (, amountETH) = _removeLiquidity(_token, WETH, liquidity, amountTokenMin, amountETHMin, address(this));
        XLibrary.lightTransferFrom(_token, address(this), to, IERC20(_token).balanceOf(address(this)) - balance0, nodes.token);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);

        _closeAction();
    }

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address _token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = pairFor[_token][WETH];
        uint value = approveMax ? type(uint).max : liquidity;
        IXPair(pair).permit(msg.sender, address(this), value, deadlineBNumber, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            _token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadlineBNumber
        );
    }

    function _diluteLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadlineBNumber
    ) internal virtual ensure(deadlineBNumber) returns (uint amountA, uint amountB) {
        address pair = pairFor[tokenA][tokenB];
        uint total = IXPair(pair).totalSupply();
        // if(liquidity == 0) liquidity = total;
        require(liquidity <= total, "XRouter: invalid liquidity");

        (uint amount0, uint amount1) = IXPair(pair).dilute(liquidity, to);
        (address token0,) = XLibrary.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, 'XRouter: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'XRouter: INSUFFICIENT_B_AMOUNT');
    }

    function diluteLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountToken, uint amountETH) {
        _openAction(ActionType.Dilute, true);

        require(msg.sender == nodes.token, "Caller is not X Contract");
        (amountToken, amountETH) = _diluteLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadlineBNumber
        );
        console.log("\tRouter: diluteLiquidityETH ----- liquidity, tokne, eth:", liquidity, amountToken, amountETH);
        XLibrary.lightTransferFrom(token, address(this), to, amountToken, nodes.token);
        //TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);

        _closeAction();
    }

    function diluteLiquidityForETH(
        address token,
        uint liquidity,
        uint amountETHMin,
        address to,
        uint deadlineBNumber
    ) public virtual override ensure(deadlineBNumber) returns (uint amountWETH) {
        _openAction(ActionType.Dilute, true);

        require(msg.sender == nodes.token, "Caller is not X contract");
        uint init_balance = address(this).balance; // It may have a temporary balance.
        require(IERC20(token).balanceOf(address(this)) == 0, "Router has a balance");
        uint[] memory amounts = new uint[](2);
        address pair = pairFor[token][WETH];

        (amounts[0], amountWETH) = IXPair(pair).dilute(liquidity, address(this));
        (address token0,) = XLibrary.sortTokens(token, WETH);
        if (token != token0 ) (amounts[0], amountWETH) = (amountWETH, amounts[0]);

        // ----------- Commented out, because of requirement change.
        // Swap amounts[0] tokens for additional WETH tokens.
        // (uint reserveToken, uint reserveWETH, ) = IXPair(pair).getReserves();
        // if (token != token0 ) (reserveToken, reserveWETH) = (reserveWETH, reserveToken);
        // amounts[1] = XLibrary.getAmountOut(amounts[0], reserveToken, reserveWETH);
        // address[] memory path = new address[](2);
        // path[0] = token; path[1] = WETH;
        // IERC20(token).approve(address(this), amounts[0]);
        // XLibrary.lightTransferFrom(token, address(this), pair, amounts[0], nodes.token); // routed to transferDirectSafe()
        // _swap(amounts, path, address(this));
        // amountWETH = amountWETH + amounts[1];
        
        // instead:
        XLibrary.lightTransferFrom(token, address(this), to, amounts[0], nodes.token);

        require(amountWETH >= amountETHMin, 'XRouter: INSUFFICIENT_AMOUNT');
        IWETH(WETH).withdraw(amountWETH);
        TransferHelper.safeTransferETH(to, amountWETH);

        require(address(this).balance == init_balance, "ETH balance remains");

        _closeAction();
    }

    function _swap(
        uint[] memory amounts,
        address[] memory path,
        address _to
    ) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = XLibrary.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOut)
                : (amountOut, uint(0));
            address to = i < path.length - 2 ? pairFor[output][path[i + 2]] : _to;
            IXPair(pairFor[input][output]).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    // **** LIBRARY FUNCTIONS ****
    function quote(
        uint amountA,
        uint reserveA,
        uint reserveB
    ) public pure virtual override returns (uint amountB) {
        return XLibrary.quote(amountA, reserveA, reserveB);
    }

    function getPair(address tokenA, address tokenB) external view virtual override returns (address pair) {
        return IXFactory(nodes.factory).getPair(tokenA, tokenB);
    }
}
