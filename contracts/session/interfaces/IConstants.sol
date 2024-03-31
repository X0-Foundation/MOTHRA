// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;

uint256 constant FeeMagnifierPower = 5;
uint256 constant FeeMagnifier = uint256(10) ** FeeMagnifierPower;
uint256 constant SqaureMagnifier = FeeMagnifier * FeeMagnifier;
uint256 constant LiquiditySafety = 1e2;

enum ActionType {
    None,
    Transfer,
    Swap,
    AddLiquidity,
    RemoveLiquidity,
    Dilute
}


uint256 constant NumberSessionTypes = 6;
uint256 constant CompensationPoolAllocPercent = 2;


struct ActionParams {
    ActionType actionType;
    uint256 session;
    uint256 lastSession;
    bool isUserAction;
}

struct FeeRates {
    uint32 accountant;
}
struct FeeStores {
    address accountant;
}

struct PairSnapshot {
    address pair;
    address token0;
    address token1;
    uint256 reserve0;
    uint256 reserve1;
    uint8   decimal0;
    uint8   decimal1;
}

enum ListStatus {
    None,
    Cleared,
    Enlisted,
    Delisted
}

struct Pair {
    address token0;
    address token1;
    ListStatus status;
}

// address constant BUSD = 0xe9e7cea3dedca5984780bafc599bd69add087d56; // BSC mainnet
//address constant BUSD = 0xe9e7cea3dedca5984780bafc599bd69add087d56; // BSC testnet
address constant BUSD = 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82; // Hardhat chain, with my test script.
address constant WBNB = 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707;
address constant HTZ = 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e;
address constant HTZRewards = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
