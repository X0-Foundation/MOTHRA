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

interface IKeep3rKeeperDisputableInterface extends ethers.utils.Interface {
  functions: {
    "revoke(address)": FunctionFragment;
    "slash(address,address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "revoke", values: [string]): string;
  encodeFunctionData(
    functionFragment: "slash",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "slash", data: BytesLike): Result;

  events: {
    "KeeperRevoke(address,address)": EventFragment;
    "KeeperSlash(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "KeeperRevoke"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KeeperSlash"): EventFragment;
}

export type KeeperRevokeEvent = TypedEvent<
  [string, string] & { _keeper: string; _slasher: string }
>;

export type KeeperSlashEvent = TypedEvent<
  [string, string, BigNumber] & {
    _keeper: string;
    _slasher: string;
    _amount: BigNumber;
  }
>;

export class IKeep3rKeeperDisputable extends BaseContract {
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

  interface: IKeep3rKeeperDisputableInterface;

  functions: {
    revoke(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    slash(
      _keeper: string,
      _bonded: string,
      _bondAmount: BigNumberish,
      _unbondAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  revoke(
    _keeper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  slash(
    _keeper: string,
    _bonded: string,
    _bondAmount: BigNumberish,
    _unbondAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    revoke(_keeper: string, overrides?: CallOverrides): Promise<void>;

    slash(
      _keeper: string,
      _bonded: string,
      _bondAmount: BigNumberish,
      _unbondAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "KeeperRevoke(address,address)"(
      _keeper?: string | null,
      _slasher?: string | null
    ): TypedEventFilter<
      [string, string],
      { _keeper: string; _slasher: string }
    >;

    KeeperRevoke(
      _keeper?: string | null,
      _slasher?: string | null
    ): TypedEventFilter<
      [string, string],
      { _keeper: string; _slasher: string }
    >;

    "KeeperSlash(address,address,uint256)"(
      _keeper?: string | null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _keeper: string; _slasher: string; _amount: BigNumber }
    >;

    KeeperSlash(
      _keeper?: string | null,
      _slasher?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _keeper: string; _slasher: string; _amount: BigNumber }
    >;
  };

  estimateGas: {
    revoke(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    slash(
      _keeper: string,
      _bonded: string,
      _bondAmount: BigNumberish,
      _unbondAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    revoke(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    slash(
      _keeper: string,
      _bonded: string,
      _bondAmount: BigNumberish,
      _unbondAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}