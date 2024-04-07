// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./math/SafeMath.sol";
import "../core/interfaces/IXPair.sol";
import "../farm/interfaces/ITGRToken.sol";
import "../session/interfaces/IConstants.sol";
import "../libraries/utils/TransferHelper.sol";

import "hardhat/console.sol";

library XLibrary {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, "XLibrary: IDENTICAL_ADDRESSES");
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "XLibrary: ZERO_ADDRESS");
    }

    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(
        address factory,
        address tokenA,
        address tokenB
    ) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(
            uint160(
                uint(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            factory,
                            keccak256(abi.encodePacked(token0, token1)),
                            hex"d82e73093d46f060c180d378416756fe20aa9237c7f9887d5e34bb579687a121" // init code hash
                        )
                    )
                )
            )
        );
    }

    // fetches and sorts the reserves for a pair
    function getReserves(
        address factory,
        address tokenA,
        address tokenB
    ) internal view returns (uint reserveA, uint reserveB) {
        (address token0, ) = sortTokens(tokenA, tokenB);
        (uint112 reserve0, uint112 reserve1, ) = IXPair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (uint(reserve0), uint(reserve1)) : (uint(reserve1), uint(reserve0));
    }

    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(
        uint amountA,
        uint reserveA,
        uint reserveB
    ) internal pure returns (uint amountB) {
        require(amountA > 0, "XLibrary: INSUFFICIENT_AMOUNT");
        require(reserveA > 0 && reserveB > 0, "XLibrary: INSUFFICIENT_LIQUIDITY");
        amountB = amountA.mul(reserveB) / reserveA;
    }

    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) internal pure returns (uint amountOut) {
        require(amountIn > 0, "XLibrary: INSUFFICIENT_INPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "XLibrary: INSUFFICIENT_LIQUIDITY");
        uint amountInWithFee = amountIn.mul(9983); // 0.17% for LP providers. Couples with Pair code.
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(10000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }

    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(
        uint amountOut,
        uint reserveIn,
        uint reserveOut
    ) internal pure returns (uint amountIn) {
        require(amountOut > 0, "XLibrary: INSUFFICIENT_OUTPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "XLibrary: INSUFFICIENT_LIQUIDITY");
        uint numerator = reserveIn.mul(amountOut).mul(10000);
        uint denominator = reserveOut.sub(amountOut).mul(9983); // 0.17% for LP providers. Couples with Pair code.
        amountIn = (numerator / denominator).add(1);
    }

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(
        address factory,
        uint amountIn,
        address[] memory path
    ) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, "XLibrary: INVALID_PATH");
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(
        address factory,
        uint amountOut,
        address[] memory path
    ) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, "XLibrary: INVALID_PATH");
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }

    function transferFeesFrom(
        address token,
        address payer,
        uint principal,
        FeeRates memory rates,
        FeeStores memory feeStores,
        address tgrToken
    ) internal returns (uint feesPaid) {
        uint fee;
        if (principal != 0) {
            if (rates.accountant != 0) {
                fee = (principal * rates.accountant) / FeeMagnifier;
                lightTransferFrom(token, payer, feeStores.accountant, fee, tgrToken);
                feesPaid += fee;
            }
        }
    }

    function lightTransferFrom(
        address tokenTransfer,
        address sender,
        address recipient,
        uint amount, 
        address tgrToken
    ) internal {
        if (tokenTransfer == tgrToken) {
            ITGRToken(tokenTransfer).transferDirectSafe(sender, recipient, amount);
        } else {
            TransferHelper.safeTransferFrom(tokenTransfer, sender, recipient, amount);
        }
    }

    function lightTransfer(
        address tokenTransfer,
        address recipient,
        uint amount, 
        address tgrToken
    ) internal {
        if (tokenTransfer == tgrToken) {
            ITGRToken(tokenTransfer).transferDirectSafe(address(this), recipient, amount);
        } else {
            TransferHelper.safeTransfer(tokenTransfer, recipient, amount);
        }
    }

}
