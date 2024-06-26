// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

import "./interfaces/IConstants.sol";
import "./interfaces/ISessionRegistrar.sol";
import "./interfaces/ISessionFees.sol";

abstract contract SessionFees is ISessionFees {

    modifier onlySessionManager virtual;
    function payFeeTgrLogic(address account, uint principal, FeeRates calldata rates, bool fromAllowance) 
    public override virtual onlySessionManager returns (uint feesPaid) {}
}