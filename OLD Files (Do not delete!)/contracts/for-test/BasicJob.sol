// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '../interfaces/IKeep3r.sol';

contract BasicJob {
  error KeeperNotValid();

  address public keep3r;
  uint public nonce;
  uint[] public array;

  constructor(address _keep3r) {
    keep3r = _keep3r;
  }

  function work() external upkeep {}

  function workHard(uint _howHard) external upkeep {
    for (uint i = nonce; i < _howHard; i++) {
      nonce++;
    }
  }

  function workRefund(uint _howHard) external upkeep {
    for (uint i; i < _howHard; i++) {
      array.push(i);
    }

    while (array.length > 0) {
      array.pop();
    }
  }

  modifier upkeep() {
    IKeep3r(keep3r).isKeeper(msg.sender);
    _;
    IKeep3r(keep3r).worked(msg.sender);
  }
}
