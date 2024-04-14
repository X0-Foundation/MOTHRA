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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IXMakerInterface extends ethers.utils.Interface {
  functions: {
    "WETH()": FunctionFragment;
    "addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "addLiquidityETH(address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "diluteLiquidityETH(address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "diluteLiquidityForETH(address,uint256,uint256,address,uint256)": FunctionFragment;
    "getPair(address,address)": FunctionFragment;
    "getReserveOnETHPair(address)": FunctionFragment;
    "quote(uint256,uint256,uint256)": FunctionFragment;
    "removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "removeLiquidityETH(address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "removeLiquidityETHSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "removeLiquidityETHWithPermit(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)": FunctionFragment;
    "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)": FunctionFragment;
    "removeLiquidityWithPermit(address,address,uint256,uint256,uint256,address,uint256,bool,uint8,bytes32,bytes32)": FunctionFragment;
    "sim_removeLiquidity(address,address,uint256)": FunctionFragment;
    "wired_addLiquidity(address,address,uint256,uint256,uint256,uint256,address,uint256)": FunctionFragment;
    "wired_removeLiquidity(address,address,uint256,uint256,uint256,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addLiquidityETH",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "diluteLiquidityETH",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "diluteLiquidityForETH",
    values: [string, BigNumberish, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserveOnETHPair",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "quote",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidity",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityETH",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityETHSupportingFeeOnTransferTokens",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityETHWithPermit",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      boolean,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      boolean,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityWithPermit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      boolean,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sim_removeLiquidity",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "wired_addLiquidity",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "wired_removeLiquidity",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addLiquidityETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "diluteLiquidityETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "diluteLiquidityForETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getReserveOnETHPair",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "quote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityETHSupportingFeeOnTransferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityETHWithPermit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityWithPermit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sim_removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wired_addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wired_removeLiquidity",
    data: BytesLike
  ): Result;

  events: {};
}

export class IXMaker extends BaseContract {
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

  interface: IXMakerInterface;

  functions: {
    WETH(overrides?: CallOverrides): Promise<[string]>;

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addLiquidityETH(
      token: string,
      amountTokenDesired: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    diluteLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    diluteLiquidityForETH(
      token: string,
      liquidity: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string] & { pair: string }>;

    getReserveOnETHPair(
      token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { reserve: BigNumber }>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountB: BigNumber }>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityETHSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityETHWithPermit(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sim_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    wired_addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wired_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  WETH(overrides?: CallOverrides): Promise<string>;

  addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addLiquidityETH(
    token: string,
    amountTokenDesired: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  diluteLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  diluteLiquidityForETH(
    token: string,
    liquidity: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPair(
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getReserveOnETHPair(
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityETHSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityETHWithPermit(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityWithPermit(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sim_removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
  >;

  wired_addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wired_removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadlineBNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>;

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amountA: BigNumber;
        amountB: BigNumber;
        liquidity: BigNumber;
      }
    >;

    addLiquidityETH(
      token: string,
      amountTokenDesired: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amountToken: BigNumber;
        amountETH: BigNumber;
        liquidity: BigNumber;
      }
    >;

    diluteLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountToken: BigNumber; amountETH: BigNumber }
    >;

    diluteLiquidityForETH(
      token: string,
      liquidity: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getReserveOnETHPair(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    removeLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountToken: BigNumber; amountETH: BigNumber }
    >;

    removeLiquidityETHSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidityETHWithPermit(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountToken: BigNumber; amountETH: BigNumber }
    >;

    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    sim_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    wired_addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amountA: BigNumber;
        amountB: BigNumber;
        liquidity: BigNumber;
      }
    >;

    wired_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;
  };

  filters: {};

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addLiquidityETH(
      token: string,
      amountTokenDesired: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    diluteLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    diluteLiquidityForETH(
      token: string,
      liquidity: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReserveOnETHPair(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityETHSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityETHWithPermit(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sim_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wired_addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wired_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addLiquidityETH(
      token: string,
      amountTokenDesired: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    diluteLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    diluteLiquidityForETH(
      token: string,
      liquidity: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPair(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReserveOnETHPair(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityETH(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityETHSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityETHWithPermit(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
      token: string,
      liquidity: BigNumberish,
      amountTokenMin: BigNumberish,
      amountETHMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityWithPermit(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      approveMax: boolean,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sim_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wired_addLiquidity(
      tokenA: string,
      tokenB: string,
      amountADesired: BigNumberish,
      amountBDesired: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wired_removeLiquidity(
      tokenA: string,
      tokenB: string,
      liquidity: BigNumberish,
      amountAMin: BigNumberish,
      amountBMin: BigNumberish,
      to: string,
      deadlineBNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}