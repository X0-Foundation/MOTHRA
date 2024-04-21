// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../libraries/math/SafeMath.sol";
import "../libraries/math/AnalyticMath.sol";
import "../libraries/math/IntegralMath.sol";


import "hardhat/console.sol";

//=====================================================================================
// Simple Exponential Reward.
// rewards[user] += _balances[user] * ( ( 1 + rewardRate ) ** blocks_passed - 1 )
//=====================================================================================

contract SimpleBurnN is Ownable {
    // using SafeMath for uint;

    //==================== Constants ====================
    string private constant sForbidden = "Forbidden";
    string private constant sZeroAddress = "Zero address";
    string private constant sExceedsBalance = "Exceeds balance";
    address constant zero_address = 0x0000000000000000000000000000000000000000;

    uint8 public constant DECIMALS = 18;
    uint public constant INITIAL_SUPPLY = 10 ** (DECIMALS+8);
    uint public constant MAX_SUPPLY = 10 * INITIAL_SUPPLY;

    //==================== ERC20 core data ====================
    string private constant _name = "SimpleBurnN";
    string private constant _symbol = "SEBNN";
    uint8 private constant _decimals = DECIMALS;
    mapping(address => mapping(address => uint)) private _allowances;
    mapping(address => uint) private _balances;
    uint private _totalSupply;

    function _safeSubtract(uint a, uint b) internal pure returns (uint delta) {
        if (a > b) {
            delta = a - b;
        } else {
            delta = 0;
        }
    }

    //========================= distrubution algoritym ======================

    // Test Stage: 
    // Share: _balances[user] is used as user's share to rewards.
    // Reward: We just handle with the reward quantity numericals here, not reward itself.

    struct User {
        uint    reward;
        uint    latestBlock;
    }

    uint initialBlock;
    mapping(address => User) users;

    // test users
    address alice; address bob; address carol;


    function getTotalState() external view returns (
        uint totalSupply, uint _latestNet, uint _VIRTUAL, uint nowBlock, uint _totalPendingReward, uint _burnDone
    ) {
        totalSupply = _totalSupply;
        _latestNet = latestNet;
        _VIRTUAL = VIRTUAL;
        nowBlock = block.number - initialBlock;
        _totalPendingReward = _viewTotalPendingReward();
        _burnDone = burnDone;
    }

    function getUserState(address user) external view returns (
        uint _share, uint _VIRTUAL, uint nowBlock, uint _userPendingReward, uint _latestBlock
    ) {
       _share = _balances[user];
        _VIRTUAL = 0;
        nowBlock = block.number - initialBlock;
        _userPendingReward = _viewUserPendingReward(user);
        _latestBlock = users[user].latestBlock;
    }

    uint constant MAGNIFIER = 10 ** 5;
    uint constant DecPerCycle = 777;
    uint constant CYCLE = 10;

    uint latestNet; uint VIRTUAL; uint burnDone; uint latestBlock;


    function _changeUserShare(address user, uint amount, bool CreditNotDebit) internal {
        {
            latestNet -= _balances[user];
            uint missings = block.number - initialBlock - latestBlock;
            (uint p1, uint q1) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, missings, CYCLE);           
            missings = block.number - initialBlock - users[user].latestBlock;
            (uint p2, uint q2) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, missings, CYCLE);
            if (block.number % 2 == 0) {
                VIRTUAL = _safeSubtract(IntegralMath.mulDivF(VIRTUAL, p1, q1), IntegralMath.mulDivC(_balances[user], p2, q2));
            } else {
                VIRTUAL = IntegralMath.mulDivC(VIRTUAL, p1, q1) - IntegralMath.mulDivF(_balances[user], p2, q2);
            }
            latestBlock = block.number - initialBlock;
        }

        uint pending = _viewUserPendingReward(user);
        if (pending > 0) {
            users[user].reward += pending;
            burnDone += pending;
        }
        users[user].latestBlock = block.number - initialBlock;

        if(CreditNotDebit) {
            _balances[user] += amount;
            _totalSupply += amount;
        } else {
            _balances[user] -= amount;
            _totalSupply -= amount;
        }

        {
            uint newBalance = _balances[user];
            latestNet += newBalance;
            VIRTUAL += newBalance;
        }
    }

    function _viewUserPendingReward(address user) internal view returns (uint pending) {
        uint missings = block.number - initialBlock - users[user].latestBlock;
        // if (missings > 0) {
            (uint p, uint q) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, missings, CYCLE);
            if (block.number % 2 == 0) {
                pending = _balances[user] - IntegralMath.mulDivF(_balances[user], p, q);
            } else {
                pending = _safeSubtract(_balances[user], IntegralMath.mulDivC(_balances[user], p, q));
            }
        // }
    }

    function _viewTotalPendingReward() internal view returns (uint pending) {
        uint missings = block.number - initialBlock - latestBlock;
        // if (missings > 0) {
            (uint p, uint q) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, missings, CYCLE);
            pending = _safeSubtract(latestNet, IntegralMath.mulDivF(VIRTUAL, p, q));
        // }
    }
    

    function checkForConsistency() public view 
    returns(uint pending_collective, uint pending_marginal, uint abs_error, uint error_rate) {

        pending_collective = _viewTotalPendingReward();

        pending_marginal += _viewUserPendingReward(owner());
        pending_marginal += _viewUserPendingReward(alice);
        pending_marginal += _viewUserPendingReward(bob);
        pending_marginal += _viewUserPendingReward(carol);

        uint pending_max;
        if (pending_collective < pending_marginal) {
            abs_error = pending_marginal - pending_collective;
            pending_max = pending_marginal;
            console.log("check --- marginal greater");

        } else {
            abs_error = pending_collective - pending_marginal;
            pending_max = pending_collective;
            if (pending_collective > pending_marginal) {
                console.log("check --- collective greater");
            } else {
                console.log("check --- balanced");
            }
        }

        if (pending_max > 0) {
            error_rate = 1e24 * abs_error/pending_max;
        }

        return (pending_collective, pending_marginal, abs_error, error_rate);
    }

    //====================== Pulse internal functions ============================


    AnalyticMath analyticMath;

    constructor(address _analyticMath) Ownable() {
        analyticMath = AnalyticMath(_analyticMath);

        //------------ distribution algorithm -----------
        initialBlock = block.number;

        // These addresses are generated by hardhat, with ethereum charged.
        alice = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        bob = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        carol = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
        
        //-----------------------------------------------
        _mint(owner(), INITIAL_SUPPLY);

   }

//     //==================== ERC20 internal functions ====================

    function _totalNetSupply() internal view returns (uint) {
        return _totalSupply;
    }

    function _netBalanceOf(address account) internal view returns (uint balance) {
        return _balances[account];
    }

    function _beforeTokenTransfer(address from, address to, uint amount) internal virtual {}

    function _afterTokenTransfer(address from, address to, uint amount) internal virtual {}

    function _mint(address to, uint amount) internal virtual {
        require(to != address(0), sZeroAddress);
        _beforeTokenTransfer(address(0), to, amount);
        _changeUserShare(to, amount, true);
        _afterTokenTransfer(address(0), to, amount);

        // emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint amount) internal virtual {
        require(from != address(0), sZeroAddress);
        uint accountBalance = _netBalanceOf(from);
        require(accountBalance >= amount, sExceedsBalance);
        _beforeTokenTransfer(from, address(0), amount);
        _changeUserShare(from, amount, false);    // false for debit
        _afterTokenTransfer(from, address(0), amount);
        
        // emit Transfer(from, address(0), amount);
    }

    function _transfer(
        address sender,
        address recipient,
        uint amount
    ) internal virtual {
        require(sender != address(0), sZeroAddress);
        require(recipient != address(0), sZeroAddress);
        uint senderBalance = _netBalanceOf(sender);
        require(senderBalance >= amount, sExceedsBalance);
        _beforeTokenTransfer(sender, recipient, amount);
        _changeUserShare(sender, amount, false);  // false: debit
        _changeUserShare(recipient, amount, true);    // true: credit
        _afterTokenTransfer(sender, recipient, amount);

        // emit Transfer(sender, recipient, amount);
    }

    function _approve(
        address _owner,
        address _spender,
        uint _amount
    ) internal virtual {
        require(_owner != address(0), sZeroAddress);
        require(_spender != address(0), sZeroAddress);
        _allowances[_owner][_spender] = _amount;

        // emit Approval(_owner, _spender, _amount);
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

    function totalSupply() public view virtual returns (uint) {
        return _totalNetSupply();
    }

    function balanceOf(address account) public view virtual returns (uint) {
        return _netBalanceOf(account); // not less than its true value
    }

    function mint(address to, uint amount) public onlyOwner {
        require(_totalNetSupply() + amount <= MAX_SUPPLY, "Exceed Max Supply");
        _mint(to, amount);
    }

    function burn(address from, uint amount) public onlyOwner {
        _burn(from, amount);
    }

    function transfer(address recipient, uint amount) public virtual returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) public virtual returns (bool) {
        if (sender != _msgSender()) {
            uint currentAllowance = _allowances[sender][_msgSender()];
            require(currentAllowance >= amount, "Transfer exceeds allowance");
        }
        _transfer(sender, recipient, amount); // No guarentee it doesn't make a change to _allowances. Revert if it fails.

        return true;
    }

    function allowance(address _owner, address _spender) public view virtual returns (uint) {
        return _allowances[_owner][_spender];
    }

    function approve(address spender, uint amount) public virtual returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function increaseAllowance(address spender, uint addedValue) public virtual returns (bool) {
        return _increaseAllowance(_msgSender(), spender, addedValue);
    }

    function decreaseAllowance(address spender, uint subtractedValue) public virtual returns (bool) {
        return _decreaseAllowance(_msgSender(), spender, subtractedValue);
    }

//     //==================== Pulse public functions ====================
}
