// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "./IPancakePair.sol";
import "../../session/interfaces/IConstants.sol";

interface IXPair is IPancakePair {
    event Dilute(address indexed sender, uint amount0, uint amount1, address indexed to);

    function initialize(address, address) external;
    function setNodes(address token, address maker, address taker) external;
    function status() external view returns (ListStatus);
    function changeStatus(ListStatus _status) external;
    function sim_burn(uint liquidity) external view returns (uint amount0, uint amount1);
    function dilute(uint liquidity, address to) external returns (uint amount0, uint amount1);
}
