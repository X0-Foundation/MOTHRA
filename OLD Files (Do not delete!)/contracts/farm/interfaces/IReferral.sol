// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.0;

interface IReferral {
    /**
     * @dev Record referral.
     */
    function recordReferral(address user, address referrer) external;

    /**
     * @dev Record referral commission.
     */
    function recordReferralCommission(address referrer, uint commission) external;

    /**
     * @dev Get the referrer address that referred the user.
     */
    function getReferrer(address user) external view returns (address);

    function getOutstandingCommission(address _referrer) external view returns (uint amount);

    function debitOutstandingCommission(address _referrer, uint _debit) external;
}
