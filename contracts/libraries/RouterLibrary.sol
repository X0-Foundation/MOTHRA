// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../session/interfaces/IConstants.sol";
import "../core/interfaces/IXPair.sol";
import "../core/interfaces/IXFactory.sol";
import "./utils/TransferHelper.sol";
import "./math/SafeMath.sol";
import "./XLibrary.sol";
import "../periphery/interfaces/IWETH.sol";

library RouterLibrary {
    using SafeMath for uint;
    using SafeERC20 for IERC20;

    function test() external {}

    function swapStep(
        uint[] memory amounts,
        address[] memory path,
        address to,
        PairSnapshot memory pairSnapshot,
        address factory,
        uint step
    ) external {
        (address input, address output) = (path[step], path[step + 1]);
        IXPair pair = IXPair(pairSnapshot.pair);

        uint amountOut = amounts[step + 1];
        (uint amount0Out, uint amount1Out) = input == pairSnapshot.token0
            ? (uint(0), amountOut)
            : (amountOut, uint(0));
        address _to = step < path.length - 2 ? XLibrary.pairFor(factory, output, path[step + 2]) : to;
        pair.swap(amount0Out, amount1Out, _to, new bytes(0));
    }

    function swapStepSupportingFee(
        address[] memory path,
        address to,
        PairSnapshot memory pairSnapshot,
        address factory,
        uint step
    ) external {
        IXPair pair = IXPair(pairSnapshot.pair);
        (address input, address output) = (path[step], path[step + 1]);

        uint amountOutput;
        {
            uint amountInput;
            (uint reserveInput, uint reserveOutput) = input == pairSnapshot.token0
                ? (pairSnapshot.reserve0, pairSnapshot.reserve1)
                : (pairSnapshot.reserve1, pairSnapshot.reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = XLibrary.getAmountOut(amountInput, reserveInput, reserveOutput);
        }

        (uint amount0Out, uint amount1Out) = input == pairSnapshot.token0
            ? (uint(0), amountOutput)
            : (amountOutput, uint(0));
        address _to = step < path.length - 2 ? XLibrary.pairFor(factory, output, path[step + 2]) : to;
        pair.swap(amount0Out, amount1Out, _to, new bytes(0));
    }
}
