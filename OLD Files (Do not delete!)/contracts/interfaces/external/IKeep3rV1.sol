// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';

// solhint-disable func-name-mixedcase
interface IKeep3rV1 is IERC20, IERC20Metadata {
  // Structs
  struct Checkpoint {
    uint32 fromBlock;
    uint votes;
  }

  // Events
  event DelegateChanged(address indexed _delegator, address indexed _fromDelegate, address indexed _toDelegate);
  event DelegateVotesChanged(address indexed _delegate, uint _previousBalance, uint _newBalance);
  event SubmitJob(address indexed _job, address indexed _liquidity, address indexed _provider, uint _block, uint _credit);
  event ApplyCredit(address indexed _job, address indexed _liquidity, address indexed _provider, uint _block, uint _credit);
  event RemoveJob(address indexed _job, address indexed _liquidity, address indexed _provider, uint _block, uint _credit);
  event UnbondJob(address indexed _job, address indexed _liquidity, address indexed _provider, uint _block, uint _credit);
  event JobAdded(address indexed _job, uint _block, address _governance);
  event JobRemoved(address indexed _job, uint _block, address _governance);
  event KeeperWorked(address indexed _credit, address indexed _job, address indexed _keeper, uint _block, uint _amount);
  event KeeperBonding(address indexed _keeper, uint _block, uint _active, uint _bond);
  event KeeperBonded(address indexed _keeper, uint _block, uint _activated, uint _bond);
  event KeeperUnbonding(address indexed _keeper, uint _block, uint _deactive, uint _bond);
  event KeeperUnbound(address indexed _keeper, uint _block, uint _deactivated, uint _bond);
  event KeeperSlashed(address indexed _keeper, address indexed _slasher, uint _block, uint _slash);
  event KeeperDispute(address indexed _keeper, uint _block);
  event KeeperResolved(address indexed _keeper, uint _block);
  event TokenCreditAddition(address indexed _credit, address indexed _job, address indexed _creditor, uint _block, uint _amount);

  // Variables
  function KPRH() external returns (address);

  function delegates(address _delegator) external view returns (address);

  function checkpoints(address _account, uint32 _checkpoint) external view returns (Checkpoint memory);

  function numCheckpoints(address _account) external view returns (uint32);

  function DOMAIN_TYPEHASH() external returns (bytes32);

  function DOMAINSEPARATOR() external returns (bytes32);

  function DELEGATION_TYPEHASH() external returns (bytes32);

  function PERMIT_TYPEHASH() external returns (bytes32);

  function nonces(address _user) external view returns (uint);

  function BOND() external returns (uint);

  function UNBOND() external returns (uint);

  function LIQUIDITYBOND() external returns (uint);

  function FEE() external returns (uint);

  function BASE() external returns (uint);

  function ETH() external returns (address);

  function bondings(address _user, address _bonding) external view returns (uint);

  function canWithdrawAfter(address _user, address _bonding) external view returns (uint);

  function pendingUnbonds(address _keeper, address _bonding) external view returns (uint);

  function pendingbonds(address _keeper, address _bonding) external view returns (uint);

  function bonds(address _keeper, address _bonding) external view returns (uint);

  function votes(address _delegator) external view returns (uint);

  function firstSeen(address _keeper) external view returns (uint);

  function disputes(address _keeper) external view returns (bool);

  function lastJob(address _keeper) external view returns (uint);

  function workCompleted(address _keeper) external view returns (uint);

  function jobs(address _job) external view returns (bool);

  function credits(address _job, address _credit) external view returns (uint);

  function liquidityProvided(
    address _provider,
    address _liquidity,
    address _job
  ) external view returns (uint);

  function liquidityUnbonding(
    address _provider,
    address _liquidity,
    address _job
  ) external view returns (uint);

  function liquidityAmountsUnbonding(
    address _provider,
    address _liquidity,
    address _job
  ) external view returns (uint);

  function jobProposalDelay(address _job) external view returns (uint);

  function liquidityApplied(
    address _provider,
    address _liquidity,
    address _job
  ) external view returns (uint);

  function liquidityAmount(
    address _provider,
    address _liquidity,
    address _job
  ) external view returns (uint);

  function keepers(address _keeper) external view returns (bool);

  function blacklist(address _keeper) external view returns (bool);

  function keeperList(uint _index) external view returns (address);

  function jobList(uint _index) external view returns (address);

  function governance() external returns (address);

  function pendingGovernance() external returns (address);

  function liquidityAccepted(address _liquidity) external view returns (bool);

  function liquidityPairs(uint _index) external view returns (address);

  // Methods
  function getCurrentVotes(address _account) external view returns (uint);

  function addCreditETH(address _job) external payable;

  function addCredit(
    address _credit,
    address _job,
    uint _amount
  ) external;

  function addVotes(address _voter, uint _amount) external;

  function removeVotes(address _voter, uint _amount) external;

  function addKPRCredit(address _job, uint _amount) external;

  function approveLiquidity(address _liquidity) external;

  function revokeLiquidity(address _liquidity) external;

  function pairs() external view returns (address[] memory);

  function addLiquidityToJob(
    address _liquidity,
    address _job,
    uint _amount
  ) external;

  function applyCreditToJob(
    address _provider,
    address _liquidity,
    address _job
  ) external;

  function unbondLiquidityFromJob(
    address _liquidity,
    address _job,
    uint _amount
  ) external;

  function removeLiquidityFromJob(address _liquidity, address _job) external;

  function mint(uint _amount) external;

  function burn(uint _amount) external;

  function worked(address _keeper) external;

  function receipt(
    address _credit,
    address _keeper,
    uint _amount
  ) external;

  function receiptETH(address _keeper, uint _amount) external;

  function addJob(address _job) external;

  function getJobs() external view returns (address[] memory);

  function removeJob(address _job) external;

  function setKeep3rHelper(address _keep3rHelper) external;

  function setGovernance(address _governance) external;

  function acceptGovernance() external;

  function isKeeper(address _keeper) external returns (bool);

  function isMinKeeper(
    address _keeper,
    uint _minBond,
    uint _earned,
    uint _age
  ) external returns (bool);

  function isBondedKeeper(
    address _keeper,
    address _bond,
    uint _minBond,
    uint _earned,
    uint _age
  ) external returns (bool);

  function bond(address _bonding, uint _amount) external;

  function getKeepers() external view returns (address[] memory);

  function activate(address _bonding) external;

  function unbond(address _bonding, uint _amount) external;

  function slash(
    address _bonded,
    address _keeper,
    uint _amount
  ) external;

  function withdraw(address _bonding) external;

  function dispute(address _keeper) external;

  function revoke(address _keeper) external;

  function resolve(address _keeper) external;

  function permit(
    address _owner,
    address _spender,
    uint _amount,
    uint _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) external;
}
