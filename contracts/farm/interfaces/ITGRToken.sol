// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITGRToken is IERC20 {

    struct Pulse {
        uint latestTime;
        uint cycle;
        uint decayRate;
        address account;
        uint accDecayPer1e12;
        uint sum_tokens;
        uint pending_burn;
        uint latestRound;
    }
    struct User {
        uint debtToPendingBurnPer1e12;        
    }

    function maxSupply() external view returns (uint);
    function mint(address to, uint amount) external;
    function burn(address from, uint amount) external;

    function transferDirectSafe(address sender, address recipient, uint amount) external;
}


