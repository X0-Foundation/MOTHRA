// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import "./interfaces/IConstants.sol";
import "./interfaces/ISessionRegistrar.sol";
import "./interfaces/ISessionManager.sol";

import "hardhat/console.sol";

abstract contract SessionManager is ISessionManager {

    ActionParams actionParams;
    ISessionRegistrar sessionRegistrar;
    ISessionFees sessionFees;

    function _openAction(ActionType actionType, bool blockReentry) internal {
        actionParams = sessionRegistrar.registerAction(actionType, blockReentry);
    }
    function _closeAction() internal {
        sessionRegistrar.unregisterAction();
    }

    function _getCurrentActionType() internal returns( ActionType ) {
        return sessionRegistrar.getCurrentActionType();
    }

    function _payFeeTgr(address account, uint principal, FeeRates memory rates, bool fromAllowance ) internal virtual returns (uint feesPaid) {
        feesPaid = sessionFees.payFeeTgrLogic(account, principal, rates, fromAllowance);
    }
}