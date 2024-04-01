// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';

import '../agency/libraries/LiquidityAmounts.sol';
import '../agency/libraries/PoolAddress.sol';
import '../agency/libraries/FixedPoint96.sol';
import '../agency/libraries/FullMath.sol';
import '../agency/libraries/TickMath.sol';
import '../agency/UniV3PairManager.sol';
import '../interfaces/external/IWeth9.sol';
import '../interfaces/IUniV3PairManager.sol';

contract UniV3PairManagerForTest is UniV3PairManager {
  constructor(address _pool, address _governance) UniV3PairManager(_pool, _governance) {}

  function internalAddLiquidity(
    uint amount0Desired,
    uint amount1Desired,
    uint amount0Min,
    uint amount1Min
  )
    external
    returns (
      uint128 liquidity,
      uint amount0,
      uint amount1
    )
  {
    return _addLiquidity(amount0Desired, amount1Desired, amount0Min, amount1Min);
  }

  function internalPay(
    address token,
    address payer,
    address recipient,
    uint value
  ) external {
    return _pay(token, payer, recipient, value);
  }

  function internalMint(address dst, uint amount) external {
    return _mint(dst, amount);
  }

  function internalBurn(address dst, uint amount) external {
    return _burn(dst, amount);
  }

  function internalTransferTokens(
    address src,
    address dst,
    uint amount
  ) external {
    _transferTokens(src, dst, amount);
  }

  function internalSafeTransferFrom(
    address token,
    address from,
    address to,
    uint value
  ) external {
    _safeTransferFrom(token, from, to, value);
  }

  receive() external payable {}
}
