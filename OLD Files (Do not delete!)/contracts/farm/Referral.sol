// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IReferral.sol";

contract Referral is IReferral, Ownable {
    mapping(address => address) public referrers; // user address => referrer address
    mapping(address => uint) public countReferrals; // referrer address => referrals count
    mapping(address => uint) public totalReferralCommissions; // referrer address => total referral commissions
    mapping(address => uint) public outstandingCommissions;

    event ReferralRecorded(address indexed user, address indexed referrer);
    event ReferralCommissionRecorded(address indexed referrer, uint commission);
    event OperatorUpdated(address indexed operator, bool indexed status);

    address public payer;
    constructor() Ownable() {
    }

    function setPayer(address _payer) external onlyOwner {
        payer = _payer;
    }

    function recordReferral(address _user, address _referrer) public override {
        require( _msgSender() == payer, "Only payer can record referrers");
        referrers[_user] = _referrer;
        countReferrals[_referrer] += 1;
        emit ReferralRecorded(_user, _referrer);
    }

    function recordReferralCommission(address _referrer, uint _commission) public override {
        require( _msgSender() == payer, "Only payer can record commission");
        totalReferralCommissions[_referrer] += _commission;
        outstandingCommissions[_referrer] += _commission;
        emit ReferralCommissionRecorded(_referrer, _commission);
    }

    function getOutstandingCommission(address _referrer) external view override returns (uint amount) {
        amount = outstandingCommissions[_referrer];
    }

    function debitOutstandingCommission(address _referrer, uint _debit) external override {
        require( _msgSender() == payer, "Only payer can debit outstanding commission");
        outstandingCommissions[_referrer] -= _debit;
    }

    // Get the referrer address that referred the user
    function getReferrer(address _user) public view override returns (address) {
        return referrers[_user];
    }
}
