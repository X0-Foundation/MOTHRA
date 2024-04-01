// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '../agency/Keep3rHelper.sol';

contract Keep3rHelperForTest is Keep3rHelper {
  uint public basefee;

  constructor(address _keep3rV2, address _governance) Keep3rHelper(_keep3rV2, _governance) {}

  function _getBasefee() internal view override returns (uint) {
    return basefee;
  }

  function setBaseFee(uint _baseFee) external {
    basefee = _baseFee;
  }
}
