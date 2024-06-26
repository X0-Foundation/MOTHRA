// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "../libraries/math/SafeMath.sol";
import "../libraries/math/UQ112x112.sol";

import "./interfaces/IXPair.sol";
import "./interfaces/IXFactory.sol";
import "./interfaces/ICallee.sol";
import "../farm/interfaces/ITGRToken.sol";

import "hardhat/console.sol";


contract XPair is IXPair {
    using Math for uint;
    using SafeMath for uint;
    using UQ112x112 for uint224;

    string public constant override name = "Liquidity Pools";
    string public constant override symbol = "LP";
    uint8 public constant override decimals = 18;
    uint public override totalSupply;
    mapping(address => uint) public override balanceOf;
    mapping(address => mapping(address => uint)) public override allowance;

    bytes32 public override DOMAIN_SEPARATOR;   // https://soliditydeveloper.com/ecrecover
    // keccak256("Permit(address owner,address spender,uint value,uint nonce,uint deadlineBNumber)");
    bytes32 public constant override PERMIT_TYPEHASH =
        0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    mapping(address => uint) public override nonces;

    uint public constant override MINIMUM_LIQUIDITY = LiquiditySafety;
    bytes4 private constant TRANSFER = bytes4(keccak256(bytes("transfer(address,uint)")));

    ListStatus public override status;

    address public override factory;
    address public override token0;
    address public override token1;

    uint112 private reserve0; // uses single storage slot, accessible via getReserves
    uint112 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 private blockNumberLast; // uses single storage slot, accessible via getReserves

    uint public override price0CumulativeLast;
    uint public override price1CumulativeLast;
    uint public override kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event

    address token;
    address maker;
    address taker;

    uint private unlocked = 1;

    modifier lock() {
        require(unlocked == 1, "Locked");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    function getReserves()
        public
        view
        override
        returns (
            uint112 _reserve0,
            uint112 _reserve1,
            uint32 _blockNumberLast
        )
    {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockNumberLast = blockNumberLast;
    }

    function setNodes(
        address _token,
        address _maker,
        address _taker
    ) external override {
        require(msg.sender == factory, "Caller != factory");
        token = _token;
        maker = _maker;
        taker = _taker;
    }

    function changeStatus(ListStatus _status) external override {
        require(msg.sender == factory, "Caller != factory");
        status = _status;
    }

    function _safeTransfer(
        address fromToken,
        address toToken,
        uint value
    ) private {
        if (fromToken == token) {
            ITGRToken(fromToken).transferDirectSafe(address(this), toToken, value);
        } else {
            (bool success, bytes memory data) = fromToken.call(abi.encodeWithSelector(TRANSFER, toToken, value));
            require(success && abi.decode(data, (bool)), "_safeTransfer failed");
        }
    }

    constructor() {
        uint chainId;
        factory = msg.sender;
        assembly {
            chainId := chainid()
        }
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint chainId,address verifyingContract)"),
                keccak256(bytes(name)),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );
        status = ListStatus.Enlisted;
    }

    function _mint(address to, uint value) internal {
        totalSupply = totalSupply.add(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(address(0), to, value);
    }

    function _burn(address from, uint value) internal {
        balanceOf[from] = balanceOf[from].sub(value);
        totalSupply = totalSupply.sub(value);
        emit Transfer(from, address(0), value);
    }

    function _approve(
        address owner,
        address spender,
        uint value
    ) private {
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _transfer(
        address from,
        address to,
        uint value
    ) private {
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }

    function approve(address spender, uint value) external override returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint value) external override returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint value
    ) external override returns (bool) {
        if (from != msg.sender && allowance[from][msg.sender] != type(uint).max) {
            allowance[from][msg.sender] -= value;
        }
        _transfer(from, to, value);
        return true;
    }

    function permit(
        address owner,
        address spender,
        uint value,
        uint deadlineBNumber,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external override {
        require(deadlineBNumber >= block.number, "Crossed deadlineBNumber");
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadlineBNumber))
            )
        );
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner, "recovered address is wrong");
        _approve(owner, spender, value);
    }

    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external override {
        require(msg.sender == factory, "Cross: FORBIDDEN"); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }

    // update reserves and, on the first call per block, price accumulators
    function _update(
        uint balance0,
        uint balance1,
        uint112 _reserve0,
        uint112 _reserve1
    ) private {
        require(balance0 <= type(uint112).max && balance1 <= type(uint112).max, "Wrong balances");
        uint32 blockNumber = uint32(block.number % 2**32);
        uint32 timeElapsed = blockNumber - blockNumberLast; // blockNumberLast: zero initially
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {  // first call per block && ...
            // * never overflows, as timeElanpsed < 2**32
            price0CumulativeLast += (uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed);
            price1CumulativeLast += (uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed);
        }
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockNumberLast = blockNumber;
        emit Sync(reserve0, reserve1);
    }

    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
        address feeTo = IXFactory(factory).feeTo();
        feeOn = feeTo != address(0);
        uint _kLast = kLast; // gas savings
        if (feeOn) {
            if (_kLast != 0) {
                uint rootK = SafeMath.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = SafeMath.sqrt(_kLast);
                if (rootK > rootKLast) {
                    uint p = totalSupply.mul(rootK.sub(rootKLast));
                    uint q = rootK.mul(3).add(rootKLast);
                    uint liquidity = p / q;
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }

    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external override lock returns (uint liquidity) {
        (uint112 _reserve0, uint112 _reserve1, ) = getReserves(); // gas savings
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = SafeMath.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
            _mint(address(0), MINIMUM_LIQUIDITY); // ensure less shares than assets
        } else {
            // non-propotional amount is taken free of liquidity
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
        }
        require(liquidity > 0, "Zero liquidity minted");
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external override lock returns (uint amount0, uint amount1) {
        (uint112 _reserve0, uint112 _reserve1, ) = getReserves(); // gas savings
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];

        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined after _mintFee since totalSupply may update
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, "No token to take after burn");
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

    function sim_burn(uint liquidity) external view override returns (uint amount0, uint amount1) {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));

        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
    }

    // this low-level function should be called from a contract which performs important safety checks
    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external override lock {
        require(amount0Out > 0 || amount1Out > 0, "XPair: Insufficient amount for swap");
        (uint112 _reserve0, uint112 _reserve1, ) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, "XPair: Insufficient reserves for swap");

        uint balance0;
        uint balance1;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "XPair: Invalid feeTo");
            
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));

            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            if (data.length > 0) ICallee(to).call(msg.sender, amount0Out, amount1Out, data);
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, "XPair: Insufficiend input amount");
        {
            // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0 * 10000 - amount0In * 17;
            uint balance1Adjusted = balance1 * 10000 - amount1In * 17;
            require(
                balance0Adjusted * balance1Adjusted >= uint(_reserve0) * _reserve1 * 10000**2,
                "XPair: Invalid liquidity aftre swap"
            );
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    function dilute(uint liquidity, address to) external virtual override lock returns (uint amount0, uint amount1) {
        require(msg.sender == maker, "CALLER IS NOT X ROUTER");
        address _token0 = token0; address _token1 = token1; // gas saving
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        require(liquidity <= _totalSupply, "Exceeds totalSupply");
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'Zero amount to dilute');
        // No _burn(address(this), liquidity), as this is not remove but dilute.
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        (uint112 _reserve0, uint112 _reserve1,) = getReserves();
        _update(balance0, balance1, _reserve0, _reserve1);
        address feeTo = IXFactory(factory).feeTo();
        if (feeTo != address(0)) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Dilute(msg.sender, amount0, amount1, to);
    }

    // force balances to match reserves
    function skim(address to) external override lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }

    // force reserves to match balances
    function sync() external override lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
