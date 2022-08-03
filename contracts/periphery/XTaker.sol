// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import "../session/Node.sol";
import "../libraries/WireLibrary.sol";
import "./interfaces/IXTaker.sol";
import "../session/SessionManager.sol";
import "./interfaces/IControlCenter.sol";
import "../libraries/utils/TransferHelper.sol";
import "../libraries/XLibrary.sol";
import "../libraries/RouterLibrary.sol";
import "../libraries/math/SafeMath.sol";
import "../core/interfaces/IXFactory.sol";
import "./interfaces/IWETH.sol";

import "hardhat/console.sol";

interface IBalanceLedger {
    function balanceOf(address account) external view returns (uint256);
}

contract XTaker is Node, IXTaker, Ownable, SessionManager {
    using SafeMath for uint256;

    address public immutable override WETH;

    string private sForbidden = "XTaker: Forbidden";
    string private sInvalidPath = "XTaker: Invalid path";
    string private sInsufficientOutput = "XTaker: Insufficient output amount";
    string private sInsufficientA = "XTaker: Insufficient A amount";
    string private sInsufficientB = "XTaker: Insufficient B amount";
    string private sExcessiveInput = "XTaker: Excessive input amount";
    string private sExpired = "XTaker: Expired";

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, sExpired);
        _;
    }

    constructor(address _WETH) Ownable() Node(NodeType.Taker) {
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

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap_controlled(
        uint256[] memory amounts,
        address[] memory path,
        address to
    ) internal virtual {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);

            (PairSnapshot memory pairSnapshot, bool isNichePair) = IControlCenter(nodes.center).captureInitialPairState(
                actionParams, input, output
            );

            _checkEnlisted(pairFor[input][output]);

            address pair = pairFor[input][output];
            (address token0, ) = XLibrary.sortTokens(input, output); //pairs[address(pair)].token0;
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out) = input == token0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
            address _to = i < path.length - 2 ? pairFor[output][path[i + 2]] : to;
            IXPair(pair).swap(amount0Out, amount1Out, _to, new bytes(0));

            if (_msgSender() != owner()) IControlCenter(nodes.center).ruleOutDeviatedPrice(isNichePair, pairSnapshot);
        }
    }

    function _swap(
        uint256[] memory amounts,
        address[] memory path,
        address to
    ) internal virtual {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            address pair = pairFor[input][output];
            (address token0, ) = XLibrary.sortTokens(input, output); //pairs[address(pair)].token0;

            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out) = input == token0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
            address _to = i < path.length - 2 ? pairFor[output][path[i + 2]] : to;
            IXPair(pair).swap(amount0Out, amount1Out, _to, new bytes(0));
        }
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        amountIn -= _payTransactonFee(path[0], msg.sender, amountIn, true);
        amounts = XLibrary.getAmountsOut(nodes.factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, sInsufficientOutput);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amounts[0], nodes.token);
        _swap_controlled(amounts, path, to);

        _closeAction();
    }

    function wired_swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to
    ) external virtual override returns (uint256[] memory amounts) {
        require(_msgSender() == nodes.token, sForbidden);

        amounts = XLibrary.getAmountsOut(nodes.factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, sInsufficientOutput);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amounts[0], nodes.token);
        _swap(amounts, path, to); // gas-saving. Will attackers dodge price control indirectly thru farm?
    }

    function sim_swapExactTokensForTokens(
        uint256 amountIn,
        address[] calldata path
    ) external view virtual override returns (uint256[] memory amounts) {
        amounts = XLibrary.getAmountsOut(nodes.factory, amountIn, path);
    }

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        amounts = XLibrary.getAmountsIn(nodes.factory, amountOut, path);
        require(amounts[0] <= amountInMax, sExcessiveInput);
        //uint b0 = IERC20(path[0]).balanceOf(pairFor[path[0]][path[1]]);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amounts[0], nodes.token);
        _swap_controlled(amounts, path, address(this));
        uint256 last = path.length - 1;
        amounts[last] -= _payTransactonFee(path[last], address(this), amounts[last], false);
        XLibrary.lightTransferFrom(path[last], address(this), to, amounts[last], nodes.token);

        _closeAction();
    }

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        require(path[0] == WETH, sInvalidPath);
        IWETH(WETH).deposit{value: msg.value}();
        uint256 amountIn = msg.value;
        amountIn -= _payTransactonFee(path[0], address(this), amountIn, true);
        amounts = XLibrary.getAmountsOut(nodes.factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, sInsufficientOutput);
        assert(IWETH(WETH).transfer(pairFor[path[0]][path[1]], amounts[0]));
        _swap_controlled(amounts, path, to);

        _closeAction();
    }

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        require(path[path.length - 1] == WETH, sInvalidPath);
        amounts = XLibrary.getAmountsIn(nodes.factory, amountOut, path);
        require(amounts[0] <= amountInMax, sExcessiveInput);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amounts[0], nodes.token);
        _swap_controlled(amounts, path, address(this));
        uint256 last = path.length - 1;
        amounts[last] -= _payTransactonFee(path[last], address(this), amounts[last], false);
        IWETH(WETH).withdraw(amounts[last]);
        TransferHelper.safeTransferETH(to, amounts[last]);

        _closeAction();
    }

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        require(path[path.length - 1] == WETH, sInvalidPath);
        amountIn -= _payTransactonFee(path[0], msg.sender, amountIn, true);
        amounts = XLibrary.getAmountsOut(nodes.factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, sInsufficientOutput);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amounts[0], nodes.token);
        _swap_controlled(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);

        _closeAction();
    }

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        _openAction(ActionType.Swap, true);

        require(path[0] == WETH, sInvalidPath);
        amounts = XLibrary.getAmountsIn(nodes.factory, amountOut, path);
        require(amounts[0] <= msg.value, sExcessiveInput);
        IWETH(WETH).deposit{value: amounts[0]}();
        uint256 amountIn = amounts[0];
        assert(IWETH(WETH).transfer(pairFor[path[0]][path[1]], amounts[0]));
        _swap_controlled(amounts, path, address(this));
        uint256 last = path.length - 1;
        amounts[last] -= _payTransactonFee(path[path.length-1], address(this), amounts[last], false);
        XLibrary.lightTransferFrom(path[last], address(this), to, amounts[last], nodes.token);

        if (msg.value > amountIn) TransferHelper.safeTransferETH(msg.sender, msg.value - amountIn);

        _closeAction();
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address to) internal virtual {
        for (uint256 i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);

            (PairSnapshot memory pairSnapshot, bool isNichePair) = IControlCenter(nodes.center).captureInitialPairState(
                actionParams, input, output
            );
            _checkEnlisted(pairFor[input][output]);

            (address token0,) = XLibrary.sortTokens(input, output);
            IPancakePair pair = IPancakePair(pairFor[input][output]);
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
                (uint reserve0, uint reserve1,) = pair.getReserves();
                (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
                amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
                amountOutput = XLibrary.getAmountOut(amountInput, reserveInput, reserveOutput);
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address _to = i < path.length - 2 ? pairFor[output][path[i + 2]] : to;
            pair.swap(amount0Out, amount1Out, _to, new bytes(0));

            if (_msgSender() != owner()) IControlCenter(nodes.center).ruleOutDeviatedPrice(isNichePair, pairSnapshot);
        }
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        _openAction(ActionType.Swap, true);

        amountIn -= _payTransactonFee(path[0], msg.sender, amountIn, true);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amountIn, nodes.token);
        uint256 balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) - balanceBefore >= amountOutMin, sInsufficientOutput);

        _closeAction();
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) {
        _openAction(ActionType.Swap, true);

        require(path[0] == WETH, sInvalidPath);
        uint256 amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        amountIn -= _payTransactonFee(path[0], address(this), amountIn, true);
        assert(IWETH(WETH).transfer(pairFor[path[0]][path[1]], amountIn));
        uint256 balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) - balanceBefore >= amountOutMin, sInsufficientOutput);

        _closeAction();
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        _openAction(ActionType.Swap, true);

        require(path[path.length - 1] == WETH, sInvalidPath);
        amountIn -= _payTransactonFee(path[0], msg.sender, amountIn, true);
        XLibrary.lightTransferFrom(path[0], msg.sender, pairFor[path[0]][path[1]], amountIn, nodes.token);
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint256 amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, sInsufficientOutput);
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);

        _closeAction();
    }

    function _payTransactonFee(
        address payerToken,
        address payerAddress,
        uint256 principal,
        bool fromAllowance
    ) internal virtual returns (uint256 feesPaid) {
        if (actionParams.isUserAction && principal > 0) {
            if (payerToken == nodes.token) {
                feesPaid = _payFeeTgr(payerAddress, principal, feeRates[actionParams.actionType], fromAllowance);
            } else {
            feesPaid = XLibrary.transferFeesFrom(
                payerToken,
                payerAddress,
                principal,
                feeRates[actionParams.actionType],
                feeStores,
                nodes.token
                );
            }
        }
    }

    // **** LIBRARY FUNCTIONS ****
    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) public pure virtual override returns (uint256 amountB) {
        return XLibrary.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure virtual override returns (uint256 amountOut) {
        return XLibrary.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure virtual override returns (uint256 amountIn) {
        return XLibrary.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint256 amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint256[] memory amounts)
    {
        return XLibrary.getAmountsOut(nodes.factory, amountIn, path);
    }

    function getAmountsIn(uint256 amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint256[] memory amounts)
    {
        return XLibrary.getAmountsIn(nodes.factory, amountOut, path);
    }
}