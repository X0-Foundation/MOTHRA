// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITGRToken is IERC20 {

    struct Pulse {
        uint latestBNumber;
        uint cycleBlocks;
        uint decayRate;
        address account;
        uint sum_tokens;
        uint burnDone;
        uint latestRound;
        uint initialRound;
        // [latestNet - magic * (1-decayRate) ** nowRound] gives burnPending at any moment of time.
        // This allows us not to call pulse_user_burn, if applied to user_burn.
        // magic is actually Virtual Latest Net Inverse Survival At Virtual LatestRound.
        // See User, TGRToken._changeBalance, TGRToken._burnPending for more.
        uint latestNet; // Sum{user} [balanceOf[user]]
        uint magic;   // Sum{user} [User.magic]. 
    }
    struct User {
        uint latestRound;
        // See Pulse, TGRToken._changeBalance, TGRToken._burnPending for more.
        uint magic;   // LatestNet * exp(1-decayRate, user.latestRound). 
    }

    function MAX_SUPPLY() external view returns (uint);
    function mint(address to, uint amount) external;
    function burn(address from, uint amount) external;

    function transferDirectSafe(address sender, address recipient, uint amount) external;

    function takeVotes(uint amount) external;
    function returnVotes(uint amount) external;
}


