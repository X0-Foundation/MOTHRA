/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IKeep3rJobsInterface extends ethers.utils.Interface {
  functions: {
    "acceptJobMigration(address,address)": FunctionFragment;
    "acceptJobOwnership(address)": FunctionFragment;
    "addJob(address)": FunctionFragment;
    "addTokenCreditsToJob(address,address,uint256)": FunctionFragment;
    "bondedPayment(address,uint256)": FunctionFragment;
    "changeJobOwnership(address,address)": FunctionFragment;
    "directTokenPayment(address,address,uint256)": FunctionFragment;
    "isBondedKeeper(address,address,uint256,uint256,uint256)": FunctionFragment;
    "isKeeper(address)": FunctionFragment;
    "jobOwner(address)": FunctionFragment;
    "jobPendingOwner(address)": FunctionFragment;
    "jobTokenCreditsAddedAt(address,address)": FunctionFragment;
    "migrateJob(address,address)": FunctionFragment;
    "pendingJobMigrations(address)": FunctionFragment;
    "slashTokenFromJob(address,address,uint256)": FunctionFragment;
    "withdrawTokenCreditsFromJob(address,address,uint256,address)": FunctionFragment;
    "worked(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptJobMigration",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptJobOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "addJob", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addTokenCreditsToJob",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "bondedPayment",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeJobOwnership",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "directTokenPayment",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isBondedKeeper",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "isKeeper", values: [string]): string;
  encodeFunctionData(functionFragment: "jobOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "jobPendingOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "jobTokenCreditsAddedAt",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "migrateJob",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingJobMigrations",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "slashTokenFromJob",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawTokenCreditsFromJob",
    values: [string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "worked", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "acceptJobMigration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptJobOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addJob", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addTokenCreditsToJob",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bondedPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeJobOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "directTokenPayment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isBondedKeeper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isKeeper", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "jobOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "jobPendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "jobTokenCreditsAddedAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrateJob", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingJobMigrations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "slashTokenFromJob",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokenCreditsFromJob",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "worked", data: BytesLike): Result;

  events: {
    "JobAddition(address,address)": EventFragment;
    "JobMigrationRequested(address,address)": EventFragment;
    "JobMigrationSuccessful(address,address)": EventFragment;
    "JobOwnershipAssent(address,address,address)": EventFragment;
    "JobOwnershipChange(address,address,address)": EventFragment;
    "JobSlashLiquidity(address,address,address,uint256)": EventFragment;
    "JobSlashToken(address,address,address,uint256)": EventFragment;
    "KeeperValidation(uint256)": EventFragment;
    "KeeperWork(address,address,address,uint256,uint256)": EventFragment;
    "TokenCreditAddition(address,address,address,uint256)": EventFragment;
    "TokenCreditWithdrawal(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "JobAddition"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobMigrationRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobMigrationSuccessful"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobOwnershipAssent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobOwnershipChange"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobSlashLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "JobSlashToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KeeperValidation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KeeperWork"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenCreditAddition"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenCreditWithdrawal"): EventFragment;
}

export type JobAdditionEvent = TypedEvent<
  [string, string] & { _job: string; _jobOwner: string }
>;

export type JobMigrationRequestedEvent = TypedEvent<
  [string, string] & { _fromJob: string; _toJob: string }
>;

export type JobMigrationSuccessfulEvent = TypedEvent<
  [string, string] & { _fromJob: string; _toJob: string }
>;

export type JobOwnershipAssentEvent = TypedEvent<
  [string, string, string] & {
    _job: string;
    _previousOwner: string;
    _newOwner: string;
  }
>;

export type JobOwnershipChangeEvent = TypedEvent<
  [string, string, string] & {
    _job: string;
    _owner: string;
    _pendingOwner: string;
  }
>;

export type JobSlashLiquidityEvent = TypedEvent<
  [string, string, string, BigNumber] & {
    _job: string;
    _liquidity: string;
    _slasher: string;
    _amount: BigNumber;
  }
>;

export type JobSlashTokenEvent = TypedEvent<
  [string, string, string, BigNumber] & {
    _job: string;
    _token: string;
    _slasher: string;
    _amount: BigNumber;
  }
>;

export type KeeperValidationEvent = TypedEvent<
  [BigNumber] & { _gasLeft: BigNumber }
>;

export type KeeperWorkEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber] & {
    _credit: string;
    _job: string;
    _keeper: string;
    _payment: BigNumber;
    _gasLeft: BigNumber;
  }
>;

export type TokenCreditAdditionEvent = TypedEvent<
  [string, string, string, BigNumber] & {
    _job: string;
    _token: string;
    _provider: string;
    _amount: BigNumber;
  }
>;

export type TokenCreditWithdrawalEvent = TypedEvent<
  [string, string, string, BigNumber] & {
    _job: string;
    _token: string;
    _receiver: string;
    _amount: BigNumber;
  }
>;

export class IKeep3rJobs extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IKeep3rJobsInterface;

  functions: {
    acceptJobMigration(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    acceptJobOwnership(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addJob(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addTokenCreditsToJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bondedPayment(
      _keeper: string,
      _payment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeJobOwnership(
      _job: string,
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    directTokenPayment(
      _token: string,
      _keeper: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isBondedKeeper(
      _keeper: string,
      _bond: string,
      _minBond: BigNumberish,
      _earned: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    jobOwner(
      _job: string,
      overrides?: CallOverrides
    ): Promise<[string] & { _owner: string }>;

    jobPendingOwner(
      _job: string,
      overrides?: CallOverrides
    ): Promise<[string] & { _pendingOwner: string }>;

    jobTokenCreditsAddedAt(
      _job: string,
      _token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _timestamp: BigNumber }>;

    migrateJob(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pendingJobMigrations(
      _fromJob: string,
      overrides?: CallOverrides
    ): Promise<[string] & { _toJob: string }>;

    slashTokenFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawTokenCreditsFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    worked(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptJobMigration(
    _fromJob: string,
    _toJob: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  acceptJobOwnership(
    _job: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addJob(
    _job: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addTokenCreditsToJob(
    _job: string,
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bondedPayment(
    _keeper: string,
    _payment: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeJobOwnership(
    _job: string,
    _newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  directTokenPayment(
    _token: string,
    _keeper: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isBondedKeeper(
    _keeper: string,
    _bond: string,
    _minBond: BigNumberish,
    _earned: BigNumberish,
    _age: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isKeeper(
    _keeper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  jobOwner(_job: string, overrides?: CallOverrides): Promise<string>;

  jobPendingOwner(_job: string, overrides?: CallOverrides): Promise<string>;

  jobTokenCreditsAddedAt(
    _job: string,
    _token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  migrateJob(
    _fromJob: string,
    _toJob: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pendingJobMigrations(
    _fromJob: string,
    overrides?: CallOverrides
  ): Promise<string>;

  slashTokenFromJob(
    _job: string,
    _token: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawTokenCreditsFromJob(
    _job: string,
    _token: string,
    _amount: BigNumberish,
    _receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  worked(
    _keeper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptJobMigration(
      _fromJob: string,
      _toJob: string,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptJobOwnership(_job: string, overrides?: CallOverrides): Promise<void>;

    addJob(_job: string, overrides?: CallOverrides): Promise<void>;

    addTokenCreditsToJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    bondedPayment(
      _keeper: string,
      _payment: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeJobOwnership(
      _job: string,
      _newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    directTokenPayment(
      _token: string,
      _keeper: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isBondedKeeper(
      _keeper: string,
      _bond: string,
      _minBond: BigNumberish,
      _earned: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isKeeper(_keeper: string, overrides?: CallOverrides): Promise<boolean>;

    jobOwner(_job: string, overrides?: CallOverrides): Promise<string>;

    jobPendingOwner(_job: string, overrides?: CallOverrides): Promise<string>;

    jobTokenCreditsAddedAt(
      _job: string,
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    migrateJob(
      _fromJob: string,
      _toJob: string,
      overrides?: CallOverrides
    ): Promise<void>;

    pendingJobMigrations(
      _fromJob: string,
      overrides?: CallOverrides
    ): Promise<string>;

    slashTokenFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawTokenCreditsFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    worked(_keeper: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "JobAddition(address,address)"(
      _job?: string | null,
      _jobOwner?: string | null
    ): TypedEventFilter<[string, string], { _job: string; _jobOwner: string }>;

    JobAddition(
      _job?: string | null,
      _jobOwner?: string | null
    ): TypedEventFilter<[string, string], { _job: string; _jobOwner: string }>;

    "JobMigrationRequested(address,address)"(
      _fromJob?: string | null,
      _toJob?: null
    ): TypedEventFilter<[string, string], { _fromJob: string; _toJob: string }>;

    JobMigrationRequested(
      _fromJob?: string | null,
      _toJob?: null
    ): TypedEventFilter<[string, string], { _fromJob: string; _toJob: string }>;

    "JobMigrationSuccessful(address,address)"(
      _fromJob?: null,
      _toJob?: string | null
    ): TypedEventFilter<[string, string], { _fromJob: string; _toJob: string }>;

    JobMigrationSuccessful(
      _fromJob?: null,
      _toJob?: string | null
    ): TypedEventFilter<[string, string], { _fromJob: string; _toJob: string }>;

    "JobOwnershipAssent(address,address,address)"(
      _job?: string | null,
      _previousOwner?: string | null,
      _newOwner?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { _job: string; _previousOwner: string; _newOwner: string }
    >;

    JobOwnershipAssent(
      _job?: string | null,
      _previousOwner?: string | null,
      _newOwner?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { _job: string; _previousOwner: string; _newOwner: string }
    >;

    "JobOwnershipChange(address,address,address)"(
      _job?: string | null,
      _owner?: string | null,
      _pendingOwner?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { _job: string; _owner: string; _pendingOwner: string }
    >;

    JobOwnershipChange(
      _job?: string | null,
      _owner?: string | null,
      _pendingOwner?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { _job: string; _owner: string; _pendingOwner: string }
    >;

    "JobSlashLiquidity(address,address,address,uint256)"(
      _job?: string | null,
      _liquidity?: null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _liquidity: string; _slasher: string; _amount: BigNumber }
    >;

    JobSlashLiquidity(
      _job?: string | null,
      _liquidity?: null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _liquidity: string; _slasher: string; _amount: BigNumber }
    >;

    "JobSlashToken(address,address,address,uint256)"(
      _job?: string | null,
      _token?: null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _slasher: string; _amount: BigNumber }
    >;

    JobSlashToken(
      _job?: string | null,
      _token?: null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _slasher: string; _amount: BigNumber }
    >;

    "KeeperValidation(uint256)"(
      _gasLeft?: null
    ): TypedEventFilter<[BigNumber], { _gasLeft: BigNumber }>;

    KeeperValidation(
      _gasLeft?: null
    ): TypedEventFilter<[BigNumber], { _gasLeft: BigNumber }>;

    "KeeperWork(address,address,address,uint256,uint256)"(
      _credit?: string | null,
      _job?: string | null,
      _keeper?: string | null,
      _payment?: null,
      _gasLeft?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber, BigNumber],
      {
        _credit: string;
        _job: string;
        _keeper: string;
        _payment: BigNumber;
        _gasLeft: BigNumber;
      }
    >;

    KeeperWork(
      _credit?: string | null,
      _job?: string | null,
      _keeper?: string | null,
      _payment?: null,
      _gasLeft?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber, BigNumber],
      {
        _credit: string;
        _job: string;
        _keeper: string;
        _payment: BigNumber;
        _gasLeft: BigNumber;
      }
    >;

    "TokenCreditAddition(address,address,address,uint256)"(
      _job?: string | null,
      _token?: string | null,
      _provider?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _provider: string; _amount: BigNumber }
    >;

    TokenCreditAddition(
      _job?: string | null,
      _token?: string | null,
      _provider?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _provider: string; _amount: BigNumber }
    >;

    "TokenCreditWithdrawal(address,address,address,uint256)"(
      _job?: string | null,
      _token?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _receiver: string; _amount: BigNumber }
    >;

    TokenCreditWithdrawal(
      _job?: string | null,
      _token?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { _job: string; _token: string; _receiver: string; _amount: BigNumber }
    >;
  };

  estimateGas: {
    acceptJobMigration(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    acceptJobOwnership(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addJob(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addTokenCreditsToJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bondedPayment(
      _keeper: string,
      _payment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeJobOwnership(
      _job: string,
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    directTokenPayment(
      _token: string,
      _keeper: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isBondedKeeper(
      _keeper: string,
      _bond: string,
      _minBond: BigNumberish,
      _earned: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    jobOwner(_job: string, overrides?: CallOverrides): Promise<BigNumber>;

    jobPendingOwner(
      _job: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    jobTokenCreditsAddedAt(
      _job: string,
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    migrateJob(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pendingJobMigrations(
      _fromJob: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    slashTokenFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawTokenCreditsFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    worked(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptJobMigration(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    acceptJobOwnership(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addJob(
      _job: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addTokenCreditsToJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bondedPayment(
      _keeper: string,
      _payment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeJobOwnership(
      _job: string,
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    directTokenPayment(
      _token: string,
      _keeper: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isBondedKeeper(
      _keeper: string,
      _bond: string,
      _minBond: BigNumberish,
      _earned: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    jobOwner(
      _job: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    jobPendingOwner(
      _job: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    jobTokenCreditsAddedAt(
      _job: string,
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    migrateJob(
      _fromJob: string,
      _toJob: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pendingJobMigrations(
      _fromJob: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    slashTokenFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawTokenCreditsFromJob(
      _job: string,
      _token: string,
      _amount: BigNumberish,
      _receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    worked(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}