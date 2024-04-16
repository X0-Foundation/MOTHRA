// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../libraries/math/SafeMath.sol";
import "../libraries/math/AnalyticMath.sol";
import "../libraries/math/IntegralMath.sol";


import "hardhat/console.sol";

//=====================================================================================
// Compounding Exponential Burn.
// _balances[user] += _balances[user] * (1 - ( 1 - burnRate ) ** blocks_passed )
//=====================================================================================

contract CompoundExpBurnNovel is Ownable {
    // using SafeMath for uint;

    //==================== Constants ====================
    string private constant sForbidden = "Forbidden";
    string private constant sZeroAddress = "Zero address";
    string private constant sExceedsBalance = "Exceeds balance";
    address constant zero_address = 0x0000000000000000000000000000000000000000;

    uint8 public constant DECIMALS = 18;
    uint public constant INITIAL_SUPPLY = 10 ** (DECIMALS+6);
    uint public constant MAX_SUPPLY = 1000 * INITIAL_SUPPLY;

    //==================== ERC20 core data ====================
    string private constant _name = "CompoundExpBurnNovel";
    string private constant _symbol = "CEBNN";
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
        uint    latestBlock;
        uint    VIRTUAL;
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
        _VIRTUAL = users[user].VIRTUAL;
        nowBlock = block.number - initialBlock;
        _userPendingReward = _viewUserPendingReward(user);
        _latestBlock = users[user].latestBlock;
    }

    uint constant MAGNIFIER = 10 ** 5;
    uint constant DecPerCycle = 777;    // Burn % per cycle blocks. So reward means burn.
    uint constant CYCLE = 10;

    uint latestNet; uint VIRTUAL; uint burnDone;


    function _changeUserShare(address user, uint amount, bool CreditNotDebit) internal {
        {
            latestNet -= _balances[user];
            VIRTUAL -= users[user].VIRTUAL;
        }

        uint pending = _viewUserPendingReward(user);
        if (pending > 0) {
            _balances[user] -= pending;
            _totalSupply -= pending;
            burnDone += pending;
            users[user].latestBlock = block.number - initialBlock;
        }

        if(CreditNotDebit) {
            _balances[user] += amount;
            _totalSupply += amount;
        } else {
            _balances[user] -= amount;
            _totalSupply -= amount;
        }

        {
            uint latestBlock = users[user].latestBlock; //============ cycle
            (uint numerator, uint denominator) = analyticMath.pow(MAGNIFIER, MAGNIFIER - DecPerCycle, latestBlock, CYCLE); // mind of order
            uint v = IntegralMath.mulDivC(_balances[user], numerator, denominator);
            users[user].VIRTUAL = v;
            latestNet += _balances[user];
            VIRTUAL += v;
        }
    }

    function _viewUserPendingReward(address user) internal view returns (uint) {
        uint missingBlocks = block.number - initialBlock - users[user].latestBlock; // ============ cycle
        (uint numerator, uint denominator) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, missingBlocks, CYCLE);
        uint pending = _balances[user] - IntegralMath.mulDivF(_balances[user], numerator, denominator);
        return pending;
    }

    function _viewTotalPendingReward() internal view returns (uint) {
        uint nowBlock = (block.number - initialBlock); // =============== cycle
        (uint numerator, uint denominator) = analyticMath.pow(MAGNIFIER - DecPerCycle, MAGNIFIER, nowBlock, CYCLE);
        return latestNet - IntegralMath.mulDivC(VIRTUAL, numerator, denominator);
    }
    

    function checkForConsistency() public view 
    returns(uint pending_collective, uint pending_marginal, uint abs_error, uint error_rate) {

        pending_collective = _viewTotalPendingReward();

        pending_marginal += _viewUserPendingReward(owner());
        pending_marginal += _viewUserPendingReward(alice);
        pending_marginal += _viewUserPendingReward(bob);
        pending_marginal += _viewUserPendingReward(carol);

        if (pending_collective < pending_marginal) {
            abs_error = pending_marginal - pending_collective;
            // console.log("check --- marginal greater");

        } else {
            abs_error = pending_collective - pending_marginal;
            // console.log("check --- collective greater");
        }

        uint pending_max = pending_collective;
        if (pending_max < pending_marginal) {
            pending_max = pending_marginal;
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
        return _totalSupply - _viewTotalPendingReward();
    }

    function _netBalanceOf(address account) internal view returns (uint balance) {
        return _balances[account] - _viewUserPendingReward(account);
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
