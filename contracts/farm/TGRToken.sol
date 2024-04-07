// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/ITGRToken.sol";
import "../session/interfaces/IConstants.sol";
import "../session/SessionRegistrar.sol";
import "../session/SessionManager.sol";
import "../session/SessionFees.sol";
import "../session/Node.sol";
import "../libraries/WireLibrary.sol";
import "../periphery/interfaces/IXMaker.sol";
import "../periphery/interfaces/IXTaker.sol";
import "../core/interfaces/IXFactory.sol"; 
import "../core/interfaces/IXPair.sol";
import "../libraries/math/SafeMath.sol";
import "../libraries/math/AnalyticMath.sol";
import "../libraries/math/IntegralMath.sol";
import "../libraries/GovLib.sol";

import "hardhat/console.sol";

// TGRToken with Governance.
contract TGRToken is Node, Ownable, ITGRToken, SessionRegistrar, SessionFees, SessionManager {

    using SafeMath for uint;

    //==================== Constants ====================
    string private constant sForbidden = "Forbidden";
    string private constant sZeroAddress = "Zero address";
    string private constant sExceedsBalance = "Exceeds balance";
    uint public constant override MAX_SUPPLY = 10 * INITIAL_SUPPLY;
    address constant zero_address = 0x0000000000000000000000000000000000000000;

    //====================

    receive() external payable {}

    //==================== ERC20 core data ====================
    string private constant _name = "TGR Token";
    string private constant _symbol = "TGR";
    uint8 private constant _decimals = 18;
    mapping(address => mapping(address => uint)) private _allowances;
    uint private _totalSupply;
    mapping(address => uint) private _balances;

    //====================== Pulse core data ============================

    // The non-user TGR accounts, not limited to the below items.
    // address tgrFtm; // Decleared in node. The address of TGR_FTM pool, which has TGR and WFTM balances.
    // address tgrHtz; // Decleared in node. The address of TGR_HTZ pool, which has TGR and HTZ balances.
    address immutable voteAccount;  // The address of the share-based, TGR staking account in the Agency dapp.
    mapping(address => uint) private _votes;
    uint _totalVotes;

    Pulse public lp_reward;
    Pulse public vote_burn;

    Pulse public user_burn;
    mapping(address => User) Users;
    uint _nonUserSumTokens;
    uint _buysell_burn_rate;
    uint _shift_burn_rate;

    // test user
    address admin; address alice; address bob; address carol;

    function getStatus(address user) external view returns (
        uint totalSupply, uint ub_sum_tokens, uint nonUserSumTokens, uint burnPending, uint latestRound, uint LNISLR,
        uint u_balances, uint u_pending, uint u_latestDecayRound, uint u_LNISLR
    ) {
        totalSupply = _totalSupply; // user_burn.sum_tokens + _nonUserSumTokens; // _totalSupply;
        ub_sum_tokens = user_burn.sum_tokens;
        nonUserSumTokens = _nonUserSumTokens;
        burnPending = _burnPending();
        latestRound = user_burn.latestRound;
        LNISLR = user_burn.LNISLR;
        u_balances = _balances[user];
        (, u_pending) = _viewPending(user);
        u_latestDecayRound = Users[user].latestDecayRound;
        u_LNISLR = Users[user].LNISLR;
    }

    function _safeSubtract(uint a, uint b) internal pure returns (uint delta) {
        if (a > b) {
            delta = a - b;
        } else {
            delta = 0;
        }
    }
    
    //====================== Pulse internal functions ============================

    function _isUserAccount(address account) internal view returns (bool) {
        return pairs[account].token0 == address(0) && account != voteAccount; // not a pair's token && not a voteAccount account
    }

    function _viewPending(address account) internal view returns (uint, uint) {
        // decay12, if non-zero, comes from time passed no less than the cycleBlocks 
        // since the latest non-zero-decay12-call to this function for this account.
        Pulse memory _user_burn = user_burn;
        User memory _user = Users[account];


        uint decayRound; uint decay12;
        decayRound = block.number / _user_burn.cycleBlocks - _user_burn.initialRound;
        uint missingRounds = _safeSubtract(decayRound, _user.latestDecayRound);
        
        (uint numerator, uint denominator) = analyticMath.pow(
            FeeMagnifier - _user_burn.decayRate, FeeMagnifier, missingRounds, uint(1)
            );
        uint survive12 =  IntegralMath.mulDivF(uint(1e12), numerator, denominator);
        decay12 = uint(1e12) - survive12;


        uint pending = _balances[account] * decay12 / uint(1e12);    // Dust: pendingBurn has positive dusts.
        return (decayRound, pending);
    }

    // function _writePending(address account) internal returns (uint decayRound, uint pendingBurn) {
    //     // decay12, if non-zero, comes from time passed no less than the cycleBlocks 
    //     // since the latest non-zero-decay12-call to this function for this account.

    //     // Users[account].latestDecayRound is updated
    //     (decayRound, uint decay12) = _writeDecay12(user_burn, Users[account]);   // Dust: decay12 has positive dusts.
    //     pendingBurn = _balances[account] * decay12 / uint(1e12);    // Dust: pendingBurn has positive dusts.
    //     console.log("_writePending. decay12, pendingBurn:", decay12, pendingBurn);    
    // }

    function _changeBalance(address account, uint amount, bool creditNotDebit) internal {
        if (_isUserAccount(account)) {
            // _balances[account] didn't change since the previous call to this function.

            {
                _safeSubtract(user_burn.latestNet, _balances[account]);
                _safeSubtract(user_burn.LNISLR, Users[account].LNISLR);
            }

            (uint decayRound, uint pending) = _viewPending(account);
            Users[account].latestDecayRound = decayRound;

            if (pending > 0) {
                // _safeSubtract doesn't manipulate data, but protects the operation from dust. 
                // Dust: _balances[account] gets negative dusts.
                _balances[account] = _safeSubtract(_balances[account], pending); // This is core burn.
                // Dust: user_burn.sum_tokens gets negative dusts.
                user_burn.sum_tokens = _safeSubtract(user_burn.sum_tokens, pending);
                // Dust: _totalSupply gets negative dusts.
                _totalSupply = _safeSubtract(_totalSupply, pending); // not less than its true value
                
                user_burn.burnDone += pending;
                // At this moment of code, net_collective = user_burn.sum_tokens - user_burn.burnDone didn't change,
            }

            if (creditNotDebit) {
                _balances[account] += amount;
                user_burn.sum_tokens += amount;
                _totalSupply += amount;
            } else {
                // Dust computing: _safeSubtract doesn't manipulate data, but projects the operation from dust coming from numerical error.
                // amount may be greater than its true real value, if it was gotten by amount = amount - fees.
                // fees = amount * rate / rage_magnifier may only be less that its true real value, due to the division operation.
                _balances[account] = _safeSubtract(_balances[account] , amount);
                user_burn.sum_tokens = _safeSubtract(user_burn.sum_tokens, amount);
                _totalSupply  = _safeSubtract(_totalSupply, amount);
            }

            {
                user_burn.latestNet += _balances[account];            
                (uint numerator, uint denominator) = analyticMath.pow(
                    FeeMagnifier, FeeMagnifier - user_burn.decayRate, Users[account].latestDecayRound, uint(1)  // mind of order. minus sign...
                );
                uint user_LNISLR = _balances[account]  * numerator / denominator;
                Users[account].LNISLR = user_LNISLR;
                user_burn.LNISLR += user_LNISLR;
            }

            // add new amount from avgNetAtAvgLastRound

        } else {
            if (creditNotDebit) {
                _balances[account] += amount;
                _nonUserSumTokens += amount;
                _totalSupply += amount;
            } else {
                // Dust compting: See the above Dust computing.
                _balances[account] = _safeSubtract(_balances[account], amount);
                _nonUserSumTokens = _safeSubtract(_nonUserSumTokens, amount);
                _totalSupply = _safeSubtract(_totalSupply, amount);
            }
        }
    }

    function _burnPending() internal view returns(uint burnPending) {
        uint decayRound = _viewPulseRound(user_burn);
                     
        (uint numerator, uint denominator) = analyticMath.pow(
            FeeMagnifier - user_burn.decayRate, FeeMagnifier,  decayRound, uint(1)
        );  // less than 1

        uint survival = IntegralMath.mulDivC(user_burn.LNISLR, numerator, denominator);
        burnPending = user_burn.latestNet - survival;
        // console.log("_burnPending. decayRound, numerator, denominator: ", decayRound, numerator, denominator);
        // console.log("_burnPending. user_burn.LNISLR, burnPending: ", user_burn.LNISLR, burnPending);
    }


    AnalyticMath analyticMath;

    constructor(address _analyticMath) Ownable() Node(NodeType.Token) {
        analyticMath = AnalyticMath(_analyticMath);

        //--------- test ---------
        admin = _msgSender();

        // These addresses are generated by hardhat, with ethereum charged.
        alice = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        bob = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        carol = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;

        // Nobody knows the private key of this account.
        voteAccount = address(uint160(uint(keccak256(abi.encodePacked("vote", blockhash(block.number))))));
        
        // struct Pulse {
        // uint latestBNumber;
        // uint cycleBlocks;
        // uint decayRate;
        // address account;
        // uint accDecayPer1e12;
        // uint sum_tokens;
        // uint burnDone;
        // uint latestRound;
        // uint initialRound;
        // uint latestNet;
        // uint LNISLR;

        uint cycleBlocks = 2;   // small for test
        lp_reward = Pulse(block.number, cycleBlocks, 690, tgrFtm, 0, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
        // 0.69% of XDAO/FTM LP has the XDAO side sold for FTM, 
        // then the FTM is used to buy HTZ which is added to XDAO lps airdrop rewards every 12 hours.        
        
        cycleBlocks = 2;    // small for test
        vote_burn = Pulse(block.number, cycleBlocks, 70, voteAccount, 0, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
        // 0.07% of tokens in the Agency dapp actively being used for voting burned every 12 hours.

        cycleBlocks = 4;    // small for test
        user_burn = Pulse(block.number, cycleBlocks, 777, zero_address, 0, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
        // 0.777% of tokens(not in Cyberswap/Agency dapp) burned each 24 hours from users wallets. 

        // ------------ What to do with this requirement ?
        // 1–55% Fee sold to HTZ and added to XDAO lps airdrop rewards depending on how much you are purchasing or selling. 
        // This is to punish large buyers/sellers but add large rewards for our dedicated DAO members.


        _buysell_burn_rate = 31415; // 31.4159265359% Fee burned on buys and sells.
        _shift_burn_rate = 13374; // 13.37420% fee on transfers burned.

        trackFeeStores = true;
        trackFeeRates = true;
        trackPairStatus = true;

        _mint(_msgSender(), INITIAL_SUPPLY);

   }

    //==================== ERC20 internal functions ====================

    function _totalSupply_() internal view returns (uint) {
        // _safeSubtract doesn't manipulate data, but protects operation from possible dust coming from numerical error.
        // user_burn.burnDone may be either less or greater than its true real value. See pulse_user_burn for details.
        return _safeSubtract(_totalSupply, _burnPending()); //_safeSubtract(_totalSupply, user_burn.burnDone);
        // return user_burn.sum_tokens + _nonUserSumTokens - user_burn.burnDone;
    }

    function _balanceOf(address account) internal view returns (uint balance) {
        if (_isUserAccount(account)) {
            // This line of code produces dust, due to numerical error. pending becomes less than its true value.
            (, uint pending) = _viewPending(account);
            // so, balance becomes greater than its true value.
            // console.log("_balanceOf. 1e6 user_burn.accDecayPer1e12/1e12:", 1e6 *user_burn.accDecayPer1e12/1e12);
            if(pending > _balances[account]) {
                console.log("_balanceOf. pending > _balances[account]");
            }
            // if (user_burn.accDecayPer1e12 > 1e12) {
            //     console.log("!!!_balanceOf. user_burn.accDecayPer1e12 is greater than 1e12");    // no problem
            // } 
            balance = _balances[account] - pending; // not less than its true value
        } else {
            balance = _balances[account];
        }
    }

    function _beforeTokenTransfer(address from, address to, uint amount) internal virtual {}

    function _afterTokenTransfer(address from, address to, uint amount) internal virtual {}

    function _mint(address to, uint amount) internal virtual {
        require(to != address(0), sZeroAddress);

        _beforeTokenTransfer(address(0), to, amount);
        _changeBalance(to, amount, true);   // true for credit
        _afterTokenTransfer(address(0), to, amount);

        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint amount) internal virtual {
        require(from != address(0), sZeroAddress);
        uint accountBalance = _balanceOf(from);
        require(accountBalance >= amount, sExceedsBalance);

        _beforeTokenTransfer(from, address(0), amount);
        _changeBalance(from, amount, false);    // false for debit
        _afterTokenTransfer(from, address(0), amount);
        
        emit Transfer(from, address(0), amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint amount
    ) internal virtual {
        require(sender != address(0), sZeroAddress);
        require(recipient != address(0), sZeroAddress);
        uint senderBalance = _balanceOf(sender);
        require(senderBalance >= amount, sExceedsBalance);
        _beforeTokenTransfer(sender, recipient, amount);
        _changeBalance(sender, amount, false);  // false: debit
        _changeBalance(recipient, amount, true);    // true: credit
        _afterTokenTransfer(sender, recipient, amount);

        emit Transfer(sender, recipient, amount);
    }

    function _transferHub(address sender, address recipient, uint amount) internal virtual {
        _openAction(ActionType.Transfer, true);

        if (amount > 0) {
            // if (actionParams.isUserAction) {  // Shift transfer
            //     // Dust computing: burnAmount may only be less than its true real value.
            //     uint burnAmount = amount * _buysell_burn_rate / FeeMagnifier;
            //     _burn(sender, burnAmount);
            //     amount -= burnAmount;
            // }
            _transfer(sender, recipient, amount);
        }

        _closeAction();
    }

    function _approve(
        address _owner,
        address _spender,
        uint _amount
    ) internal virtual {
        require(_owner != address(0), sZeroAddress);
        require(_spender != address(0), sZeroAddress);
        _allowances[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }

   function _increaseAllowance(address _owner, address _spender, uint addedValue) internal virtual returns (bool) {
        require(_owner != address(0), sZeroAddress);
        _approve(_owner, _spender, _allowances[_owner][_spender] + addedValue);
        return true;
    }

    function _decreaseAllowance(address _owner, address _spender, uint subtractedValue) public virtual returns (bool) {
        require(_owner != address(0), sZeroAddress);
        _approve(_owner, _spender, _allowances[_owner][_spender] - subtractedValue);
        return true;
    }


    //==================== ERC20 public funcitons ====================

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override virtual returns (uint) {
        return _totalSupply_();
    }

    function balanceOf(address account) public view override virtual returns (uint) {
        return _balanceOf(account); // not less than its true value
    }

    function mint(address to, uint amount) public override onlyOwner {
        require(_totalSupply_() + amount <= MAX_SUPPLY, "Exceed Max Supply");
        _mint(to, amount);
    }

    function burn(address from, uint amount) public override onlyOwner {
        _burn(from, amount);
    }

    function transfer(address recipient, uint amount) public override virtual returns (bool) {
        _transferHub(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) public override virtual returns (bool) {
        if (sender != _msgSender()) {
            uint currentAllowance = _allowances[sender][_msgSender()];
            require(currentAllowance >= amount, "Transfer exceeds allowance");
            _approve(sender, _msgSender(), currentAllowance - amount);
        }
        _transferHub(sender, recipient, amount); // No guarentee it doesn't make a change to _allowances. Revert if it fails.

        return true;
    }

    function allowance(address _owner, address _spender) public view override virtual returns (uint) {
        return _allowances[_owner][_spender];
    }

    function approve(address spender, uint amount) public override virtual returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function increaseAllowance(address spender, uint addedValue) public virtual returns (bool) {
        return _increaseAllowance(_msgSender(), spender, addedValue);
    }

    function decreaseAllowance(address spender, uint subtractedValue) public virtual returns (bool) {
        return _decreaseAllowance(_msgSender(), spender, subtractedValue);
    }

    //==================== Pulse public functions ====================

    function _writePulseDecay12(Pulse storage pulse) internal returns (uint decayPer1e12) {
        // Assumption: The amount subject to decay did not change since the pulse.latestRound or pulse/latestBNumber

        // pulse.lastTime, pulse.cycleBlocks, pulse.decayRate
        uint decayRound = block.number / pulse.cycleBlocks - pulse.initialRound;  // the fraction is saved in the number for later use
        if (decayRound > pulse.latestRound) {
            uint missingRounds = decayRound - pulse.latestRound;
            pulse.latestRound = decayRound;
            pulse.latestBNumber = block.number; // Not used.

            decayPer1e12 = uint(0);
            for(uint i = 0; i < missingRounds; i++) {
                decayPer1e12 = decayPer1e12 + (uint(1e12) - decayPer1e12) * pulse.decayRate / FeeMagnifier;
            }

            // Dust computing: decayPer1e12 may be less than its true real value, due to the division operation.
        }
    }

    function _viewPulseRound(Pulse storage pulse) internal view returns(uint decayRound) {
        decayRound = block.number / pulse.cycleBlocks - pulse.initialRound;
    }

    // function _writeDecay12(Pulse storage pulse, User storage user) internal returns (uint decay12) {
    //     (decay12, user.latestDecayRound) = _viewDecay12(pulse, user);
    //     // console.log("_writeDecay12. user.latestDecayRound:", user.latestDecayRound);
    //     pulse.latestBNumber = block.number;
    // }

    function pulse_lp_reward() external {
        // 0.69% of XDAO/FTM LP has the XDAO side sold for FTM, 
        // then the FTM is used to buy HTZ which is added to XDAO lps airdrop rewards every 12 hours.

        uint dilute12 = _writePulseDecay12(lp_reward); // not greater than its true value.
        // Delute by decayPar1e12 (ie, remove decayPer1e12 portion from tgrFtm pool), use the TGR part to buy FTM, 
        // and use the FTM tokens to buy HTZ tokens at the htzftm pool, 
        // then add them to airdrop rewards.

        if (dilute12 > 0) {
            // 1. dilute for FTM
            uint tgrAmount = _balanceOf(address(this));
            uint decay = IERC20(tgrFtm).totalSupply() * dilute12 / uint(1e12);
            uint amountETH = IXMaker(nodes.maker).diluteLiquidityForETH(
                address(this), decay, 0, address(this), block.number
            ); 
            // it's dilution only, keeping the totalSupply of liquidity unchanged 
            // and moving the two token sides of diluted liquidity to this contract

            // 2. burn the TGR side of the deluted liquidity
            tgrAmount = _balanceOf(address(this)) - tgrAmount;
            _burn(address(this), tgrAmount);
            console.log("FTM and TGR gained by LP dilution -----", amountETH, tgrAmount);

            // 3. buy HTZ with FTM
            address[] memory path = new address[](2);
            path[0] = WBNB; path[1] = HTZ;
            uint amountHertz = IERC20(HTZ).balanceOf(address(this));
            //// We may need to get this swap free from the price change control.
            IXTaker(nodes.taker).swapExactETHForTokens {value: amountETH} (0, path, address(this), block.number);
            amountHertz = IERC20(HTZ).balanceOf(address(this)) - amountHertz;
            console.log("HTZ gained by swap -----", amountHertz);

            // 4. add the bought HTZ to HTZRewards
            IERC20(HTZ).transfer(HTZRewards, amountHertz);

            lp_reward.latestBNumber = block.number;
        }
    }

    function pulse_vote_burn() external {
        // 0.07% of tokens in the Agency dapp actively being used for voting burned every 12 hours.

        uint decayP12 = _writePulseDecay12(vote_burn); // not greater than its true value.

        if (decayP12 > 0) {
            // burn decayPer1e12 portion of voteAccount account's TRG balance.
            _burn(vote_burn.account, _balances[vote_burn.account] * decayP12 / uint(1e12));
            vote_burn.latestBNumber = block.number;

        }
    }

    function takeVotes(uint amount) external {
        address taker = msg.sender;
        uint tgrPer1e12Votes;

        if (_totalVotes == 0) {
            tgrPer1e12Votes = 100 * uint(1e12);  // arbitrary
        } else {
            // Dust computing: 
            tgrPer1e12Votes = _balances[vote_burn.account] * uint(1e12) / _totalVotes;
        }

        uint tgrAmount = tgrPer1e12Votes * amount / uint(1e12);
        require(_balances[taker] >= tgrAmount, "short of TGR tokens");
        _transfer(taker, vote_burn.account, tgrAmount);

        _votes[taker] += amount;
        _totalVotes += amount;

        // event
    }

    function returnVotes(uint amount) external {
        address returner = msg.sender;
        uint tgrPer1e12Votes;
        
        if (_totalVotes == 0) { // some users may call this function when there is no votes at all.
            tgrPer1e12Votes = 100 * uint(1e12);  // arbitrary
        } else {
            // Dust computing: 
            tgrPer1e12Votes = _balances[vote_burn.account] * uint(1e12) / _totalVotes;
        }

        uint tgrAmount = tgrPer1e12Votes * amount / uint(1e12);
        require(_votes[returner] >= amount, "amount exceeding votes");
        _transfer(vote_burn.account, returner, tgrAmount);

        _votes[returner] -= amount; // no _safeSubtract, as _votes[returner] >= amount was required above.
        _totalVotes -= amount;      // no _safeSubtract, as _totalVotes >= _votes[returner]

        // event
    }

    // function pulse_user_burn() external {
    //     // 0.777% of tokens(not in Cyberswap/Agency dapp) burned each 24 hours from users wallets.
    //     // Interpretation: TGR tokens not in Cyberswap accounts (tgrftm and tgrhtz), and not in Agency account (voteAccount account), 
    //     // will be burned at the above rate and interval.

    //     // This part of code is an invention: What's diffent from preceeding approach?
    //     // - deltaAccPer1e12 encodes history.
    //     // - deltaAccPer1e12 is defined first.
    //     // - deltaAccPer1e12 decides new_burn.
    //     checkForConsistency();
    //     uint decay12 = _writePulseDecay12(user_burn);
    //     // Dust computing: decayPer1e12 may only be less than its true real value. See _writePulseDecay12 for more.
    //     if (decay12 > 0) {
    //         checkForConsistency();
    //         // _safeSubract doesn't manipulate data, but protects operation from possible dust coming from numerical error.
    //         // Note. user_burn.burnDone may be either less or greater that its true real value. See Dust computiong below.
    //         uint net_collective = _safeSubtract(user_burn.sum_tokens, user_burn.burnDone);
                        
    //         uint deltaAccPer1e12 = decay12; // 1st choise: 
    //         // uint deltaAccPer1e12 = (uint(1e12)-user_burn.accDecayPer1e12) * decay12 / uint(1e12); // 2nd choice: 
            
    //         // Dust computing: deltaAccPer1e12 may be either less or greater than its true value.
    //         // deltaAccPer1e12 was less than its true real value due to the division initially, when user_burn.accDecayPer1e12 was zero.
    //         // So was user_burn.accDecayPer1e12, initially, which was the same as deltaAccPer1e12.
    //         // Later, user_burn.accDecayPer1e12, which was less initially, may makes deltaAccPer1e12 greater than its true real value.
    //         // So we don't know exactly it will be only less or greater.

    //         checkForConsistency();
    //         // uint new_burn = net_collective * decayPer1e12 / 1e12;  // smaller than its real value
    //         uint new_burn = net_collective * deltaAccPer1e12 / uint(1e12);

    //         new_burn = user_burn.sum_tokens * deltaAccPer1e12 / uint(1e12);

    //         // Dust computing: user_burn.burnDone may be either less or greater than its true real value,
    //         // because deltaAccPer1e12 may be.
    //         user_burn.burnDone += new_burn;

    //         // increased user_burn.accDecayPer1e12 will increase users' pending burn, and decrease _balanceOf(account)
    //         user_burn.accDecayPer1e12 += deltaAccPer1e12;
    //         // Dust computing: user_burn.accDecayPer1e12 may be either less or greater than its true real value.
    //         // Initially, it was the same, but later it fluctuate around its true real value, together with deltaAccPer1e12.
    //     }
    // }

    function pulse_user_burn() external {
        // 0.777% of tokens(not in Cyberswap/Agency dapp) burned each 24 hours from users wallets.
        // Interpretation: TGR tokens not in Cyberswap accounts (tgrftm and tgrhtz), and not in Agency account (voteAccount account), 
        // will be burned at the above rate and interval.

        uint decay12 = _writePulseDecay12(user_burn);

    }

    function checkForConsistency() public view returns(uint pending_collective, uint pending_marginal, uint abs_error, uint error_rate) {

        // Defines user_burn attributes, based on the ERC20 core data.
        // require(user_burn.sum_tokens + _nonUserSumTokens == _totalSupply, "sum_tokens + _nonUserSumTokens != _totalSupply");
        // This implies that user_burn.sum_tokens - user_burn.burnDone + _nonUserSumTokens == _totalSupply
        // See totalSupply()

        // uint net_collective = user_burn.sum_tokens; //_safeSubtract(user_burn.sum_tokens, user_burn.burnDone);
        // uint net_marginal = balanceOf(admin) + balanceOf(alice) + balanceOf(bob) + balanceOf(carol);


        pending_collective = _burnPending();

        uint pending;
        (, pending) = _viewPending(admin);   pending_marginal +=  pending;
        (, pending) = _viewPending(alice);   pending_marginal +=  pending;
        (, pending) = _viewPending(bob);   pending_marginal += pending;
        (, pending) = _viewPending(carol);   pending_marginal +=  pending;

        if (pending_collective < pending_marginal) {
            abs_error = pending_marginal - pending_collective;
            // console.log("check --- marginal greater");

        } else {
            abs_error = pending_collective - pending_marginal;
            // console.log("check --- collective greater");
        }

        if (pending_collective > 0) {
            error_rate = 1e12 * abs_error/pending_collective;
        }
    }

    //======================= DEX cooperations ===============================


    function transferDirectSafe(
        address sender,
        address recipient,
        uint amount
    ) external virtual override {
        address msgSender = _msgSender();

        if (msgSender == nodes.maker) { // Add/Remove TGR liquidity. 'Dilute' removed, as requirement changed.
            if (pairs[recipient].token0 != address(0)) {
                ActionType action = _getCurrentActionType();
                if (action == ActionType.AddLiquidity) {    // Add
                    console.log("Add");
                // } else if (action == ActionType.Dilute) {    // Dilute
                //     console.log("Dilute");
                } else {
                    console.log("Inconsistenct 0");
                }
            } else if (sender == nodes.maker) {  // Remove
                console.log("Remove1");
            } else {
                revert("Inconsistent 1");
            }

        } else if (msgSender == nodes.taker) { // Buy/Sell TGR tokens
            if (pairs[recipient].token0 != address(0)) {  // Sell, as Taker sends tokens (from any) to a pool.
                console.log("Sell");
            } else if (sender == nodes.taker) {  // Buy, as Taker sends tokens from Taker to a non-pool.
                console.log("Buy");
            } else {
                revert("Inconsistenct 2");
            }

            uint burnAmount = amount * _buysell_burn_rate / FeeMagnifier;
            _burn(sender, burnAmount);
            amount -= burnAmount;

        } else if (msgSender == sender) {
            if (pairs[msgSender].token0 != address(0)) { // Remove/Buy/Dilute
                ActionType action = _getCurrentActionType();
                if(action == ActionType.Swap) { // Buy
                    uint burnAmount = amount * _buysell_burn_rate / FeeMagnifier;
                    _burn(sender, burnAmount);
                    amount -= burnAmount;
                    console.log("Buy");
                } else if (action == ActionType.RemoveLiquidity) { // Remove
                    console.log("Remove2");
                } else if (action == ActionType.Dilute) { // Dilute
                    console.log("Dilute");
                } else {
                    revert("Inconsistenct 5");
                }
            }

        } else {
                revert("Wrong msgSender");
        }

        if (amount > _balances[sender]) amount = _balances[sender];
        if (amount > 0) {
            _transfer(sender, recipient, amount);
            //_moveDelegates(_delegates[sender], _delegates[recipient], amount);
        }
    }

    function changeBurnRates(uint _buysell_burn_rate, uint _shift_burn_rate) external onlyOwner {
        require(_buysell_burn_rate <= FeeMagnifier && _shift_burn_rate <= FeeMagnifier, "Invalid burn rates");
        _buysell_burn_rate = _buysell_burn_rate;
        _shift_burn_rate = _shift_burn_rate;
    }

    //==================== Base contracts ====================

    modifier onlySessionManager() virtual override(SessionFees, SessionRegistrar) {
        address msgSender = _msgSender();
        require(
            msgSender == nodes.token ||
                msgSender == nodes.maker ||
                msgSender == nodes.taker,
            "Not a session manager"
        );
        _;
    }

    modifier ownerOnly() virtual override {
        require(_msgSender() == owner(), "Not owner");
        _;
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

    //================== Agency-related ====================
}
