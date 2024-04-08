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
        uint totalSupply, uint ub_sum_tokens, uint nonUserSumTokens, uint burnPending, uint burnDone, uint latestRound,
        uint latestNet, uint VIRTUAL, uint u_VIRTUAL, uint u_balances, uint u_pending, uint u_latestDecayRound
    ) {
        totalSupply = _totalSupply; // user_burn.sum_tokens + _nonUserSumTokens; // _totalSupply;
        ub_sum_tokens = user_burn.sum_tokens;
        nonUserSumTokens = _nonUserSumTokens;
        burnPending = _burnPending();
        burnDone = user_burn.burnDone;
        latestRound = user_burn.latestRound;
        latestNet = user_burn.latestNet;
        u_VIRTUAL = Users[user].VIRTUAL;
        VIRTUAL = user_burn.VIRTUAL;
        u_balances = _balances[user];
        (, u_pending) = _viewPending(user);
        u_latestDecayRound = Users[user].latestRound;
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
        Pulse memory _user_burn = user_burn;    // gas saving
        User memory _user = Users[account];     // gas saving

        uint decayRound; uint decay12;
        decayRound = block.number / _user_burn.cycleBlocks - _user_burn.initialRound;
        uint missingRounds = decayRound - _user.latestRound;
        
        (uint numerator, uint denominator) = analyticMath.pow(
            RateMagnifier - _user_burn.decayRate, RateMagnifier, missingRounds, uint(1)
            );
        uint survive12 =  IntegralMath.mulDivC(uint(1e12), numerator, denominator); // Ceil for more survival, generouse burning
        decay12 = uint(1e12) - survive12;

        uint pending = _balances[account] * decay12 / uint(1e12);    // Dust: pendingBurn has positive dusts.
        return (decayRound, pending);
    }

    function _changeBalance(address account, uint amount, bool creditNotDebit) internal {
        if (_isUserAccount(account)) {
            // _balances[account] didn't change since the previous call to this function.
            {
                user_burn.latestNet = _safeSubtract(user_burn.latestNet, _balances[account]);   // subtract previously added value.
                user_burn.VIRTUAL = _safeSubtract(user_burn.VIRTUAL, Users[account].VIRTUAL);   // subtract previously added value.
            }

            // decayRound: the current round of decay.
            // pending: pending amount of burn for the 'account' user.
            (uint decayRound, uint pending) = _viewPending(account);

            if (pending > 0) {
                // _safeSubtract doesn't manipulate data, but protects the operation from dusts. 
                // Dust: _balances[account] gets negative dusts.
                _balances[account] = _safeSubtract(_balances[account], pending); // This is core burn.
                // Dust: user_burn.sum_tokens gets negative dusts.
                user_burn.sum_tokens = _safeSubtract(user_burn.sum_tokens, pending);
                // Dust: _totalSupply gets negative dusts.
                _totalSupply = _safeSubtract(_totalSupply, pending); // not less than its true value
                
                user_burn.burnDone += pending;
                // At this moment of code, net_collective = user_burn.sum_tokens - user_burn.burnDone didn't change,
            } 
            
            // no pending now. _balances[account] is the net balance of account.

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
                    RateMagnifier, RateMagnifier - user_burn.decayRate, decayRound, uint(1)  // mind of order. minus sign...
                );
                uint user_VIRTUAL = IntegralMath.mulDivC(_balances[account], numerator, denominator); // Ceil for mode survival
                Users[account].VIRTUAL = user_VIRTUAL;
                user_burn.VIRTUAL += user_VIRTUAL;
                Users[account].latestRound = decayRound;
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
            RateMagnifier - user_burn.decayRate, RateMagnifier,  decayRound, uint(1)
        );  // less than 1

        // Choose Ceil for more survival, and for making 1-gway-error to 0-gway-error in checkConsistency
        // Otherwise, 1 and 0 will give (1-0) / 1 == 100 % error.
        uint survival = IntegralMath.mulDivC(user_burn.VIRTUAL, numerator, denominator);
        burnPending = _safeSubtract(user_burn.latestNet, survival);
        // console.log("_burnPending. decayRound, numerator, denominator: ", decayRound, numerator, denominator);
        // console.log("_burnPending. user_burn.VIRTUAL, burnPending: ", user_burn.VIRTUAL, burnPending);
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
        // uint sum_tokens;
        // uint burnDone;
        // uint latestRound;
        // uint initialRound;
        // uint latestNet;
        // uint VIRTUAL;

        uint cycleBlocks = 30;   // small for test
        lp_reward = Pulse(block.number, cycleBlocks, 690, tgrFtm, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
        // 0.69% of XDAO/FTM LP has the XDAO side sold for FTM, 
        // then the FTM is used to buy HTZ which is added to XDAO lps airdrop rewards every 12 hours.        
        
        cycleBlocks = 30;    // small for test
        vote_burn = Pulse(block.number, cycleBlocks, 70, voteAccount, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
        // 0.07% of tokens in the Agency dapp actively being used for voting burned every 12 hours.

        cycleBlocks = 30;    // small for test
        user_burn = Pulse(block.number, cycleBlocks, 777, zero_address, 0, 0, block.number / cycleBlocks, block.number / cycleBlocks, 0, 0);
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
            if (actionParams.isUserAction) {  // Shift transfer
                // Dust computing: burnAmount may only be less than its true real value.
                uint burnAmount = amount * _buysell_burn_rate / RateMagnifier;
                _burn(sender, burnAmount);
                amount -= burnAmount;
            }
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
                decayPer1e12 = decayPer1e12 + (uint(1e12) - decayPer1e12) * pulse.decayRate / RateMagnifier;
            }

            // Dust computing: decayPer1e12 may be less than its true real value, due to the division operation.
        }
    }

    function _viewPulseRound(Pulse storage pulse) internal view returns(uint decayRound) {
        decayRound = block.number / pulse.cycleBlocks - pulse.initialRound;
    }

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

    function pulse_user_burn() external {
    }

    function checkForConsistency() public view 
    returns(uint pending_collective, uint pending_marginal, uint abs_error, uint error_rate) {

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
                    console.log("\ttransferDirectSafe: Add");
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

            uint burnAmount = amount * _buysell_burn_rate / RateMagnifier;
            _burn(sender, burnAmount);
            amount -= burnAmount;

        } else if (msgSender == sender) {
            if (pairs[msgSender].token0 != address(0)) { // Remove/Buy/Dilute
                ActionType action = _getCurrentActionType();
                if(action == ActionType.Swap) { // Buy
                    uint burnAmount = amount * _buysell_burn_rate / RateMagnifier;
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
        require(_buysell_burn_rate <= RateMagnifier && _shift_burn_rate <= RateMagnifier, "Invalid burn rates");
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
