/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKeep3rJobs, IKeep3rJobsInterface } from "../IKeep3rJobs";

const _abi = [
  {
    inputs: [],
    name: "AlreadyAKeeper",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientJobTokenCredits",
    type: "error",
  },
  {
    inputs: [],
    name: "JobAlreadyAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "JobMigrationImpossible",
    type: "error",
  },
  {
    inputs: [],
    name: "JobMigrationLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "JobMigrationUnavailable",
    type: "error",
  },
  {
    inputs: [],
    name: "JobTokenCreditsLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "JobTokenInsufficient",
    type: "error",
  },
  {
    inputs: [],
    name: "JobTokenUnexistent",
    type: "error",
  },
  {
    inputs: [],
    name: "JobUnapproved",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyJobOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyPendingJobOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenUnallowed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_jobOwner",
        type: "address",
      },
    ],
    name: "JobAddition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_fromJob",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_toJob",
        type: "address",
      },
    ],
    name: "JobMigrationRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_fromJob",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_toJob",
        type: "address",
      },
    ],
    name: "JobMigrationSuccessful",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "JobOwnershipAssent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_pendingOwner",
        type: "address",
      },
    ],
    name: "JobOwnershipChange",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_liquidity",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_slasher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "JobSlashLiquidity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_slasher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "JobSlashToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_gasLeft",
        type: "uint256",
      },
    ],
    name: "KeeperValidation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_credit",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_gasLeft",
        type: "uint256",
      },
    ],
    name: "KeeperWork",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "TokenCreditAddition",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "TokenCreditWithdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fromJob",
        type: "address",
      },
      {
        internalType: "address",
        name: "_toJob",
        type: "address",
      },
    ],
    name: "acceptJobMigration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
    ],
    name: "acceptJobOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
    ],
    name: "addJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addTokenCreditsToJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_payment",
        type: "uint256",
      },
    ],
    name: "bondedPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "changeJobOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "directTokenPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_bond",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minBond",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_earned",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "isBondedKeeper",
    outputs: [
      {
        internalType: "bool",
        name: "_isBondedKeeper",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
    ],
    name: "isKeeper",
    outputs: [
      {
        internalType: "bool",
        name: "_isKeeper",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
    ],
    name: "jobOwner",
    outputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
    ],
    name: "jobPendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "_pendingOwner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "jobTokenCreditsAddedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fromJob",
        type: "address",
      },
      {
        internalType: "address",
        name: "_toJob",
        type: "address",
      },
    ],
    name: "migrateJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fromJob",
        type: "address",
      },
    ],
    name: "pendingJobMigrations",
    outputs: [
      {
        internalType: "address",
        name: "_toJob",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "slashTokenFromJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_job",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "withdrawTokenCreditsFromJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_keeper",
        type: "address",
      },
    ],
    name: "worked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IKeep3rJobs__factory {
  static readonly abi = _abi;
  static createInterface(): IKeep3rJobsInterface {
    return new utils.Interface(_abi) as IKeep3rJobsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IKeep3rJobs {
    return new Contract(address, _abi, signerOrProvider) as IKeep3rJobs;
  }
}