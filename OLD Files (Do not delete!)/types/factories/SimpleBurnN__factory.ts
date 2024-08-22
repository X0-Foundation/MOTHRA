/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SimpleBurnN, SimpleBurnNInterface } from "../SimpleBurnN";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_analyticMath",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "DECIMALS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "_decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkForConsistency",
    outputs: [
      {
        internalType: "uint256",
        name: "pending_collective",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pending_marginal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "abs_error",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "error_rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalState",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_latestNet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_VIRTUAL",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nowBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalPendingReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_burnDone",
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
        name: "user",
        type: "address",
      },
    ],
    name: "getUserState",
    outputs: [
      {
        internalType: "uint256",
        name: "_share",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_VIRTUAL",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nowBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userPendingReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_latestBlock",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a8138038062001a8183398101604081905262000034916200049a565b6200003f33620000fb565b600d80546001600160a01b0383166001600160a01b031991821617909155436004556006805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600780548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600880549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e160126008620004e2565b620000ee90600a62000609565b6200014b565b50620006ec565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b81526004016200019891906200061a565b60405180910390fd5b50620001b082826001620001b4565b5050565b6001600160a01b0383166000908152600260205260408120546009805491929091620001e290849062000672565b90915550506001600160a01b038316600090815260056020526040812060010154600a8054919290916200021890849062000672565b90915550506004546200022c904362000672565b600c5560006200023c84620003f8565b9050801562000290576001600160a01b038416600090815260056020526040812080548392906200026f9084906200068c565b9250508190555080600b60008282546200028a91906200068c565b90915550505b6004546200029f904362000672565b6001600160a01b038516600090815260056020526040902060020155811562000313576001600160a01b03841660009081526002602052604081208054859290620002ec9084906200068c565b9250508190555082600360008282546200030791906200068c565b909155506200035e9050565b6001600160a01b038416600090815260026020526040812080548592906200033d90849062000672565b92505081905550826003600082825462000358919062000672565b90915550505b60006004544362000370919062000672565b6001600160a01b038616600090815260026020526040812054600980549394509092839290620003a29084906200068c565b9091555060009050620003b68383620006a7565b905080600a6000828254620003cc91906200068c565b90915550506001600160a01b039096166000908152600560205260409020600101959095555050505050565b6001600160a01b03811660009081526005602052604081206002015460045482919062000426904362000672565b62000432919062000672565b9050801562000494576001600160a01b038316600090815260026020526040902054600a90620f42409083906200046d9061058e90620006a7565b620004799190620006a7565b620004859190620006c9565b620004919190620006c9565b91505b50919050565b600060208284031215620004ad57600080fd5b81516001600160a01b0381168114620004c557600080fd5b9392505050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff03821115620005025762000502620004cc565b019392505050565b600181815b808511156200054b5781600019048211156200052f576200052f620004cc565b808516156200053d57918102915b93841c93908002906200050f565b509250929050565b600082620005645750600162000603565b81620005735750600062000603565b81600181146200058c57600281146200059757620005b7565b600191505062000603565b60ff841115620005ab57620005ab620004cc565b50506001821b62000603565b5060208310610133831016604e8410600b8410161715620005dc575081810a62000603565b620005e883836200050a565b8060001904821115620005ff57620005ff620004cc565b0290505b92915050565b6000620004c560ff84168362000553565b600060208083528351808285015260005b8181101562000649578581018301518582016040015282016200062b565b818111156200065c576000604083870101525b50601f01601f1916929092016040019392505050565b600082821015620006875762000687620004cc565b500390565b60008219821115620006a257620006a2620004cc565b500190565b6000816000190483118215151615620006c457620006c4620004cc565b500290565b600082620006e757634e487b7160e01b600052601260045260246000fd5b500490565b61138580620006fc6000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063a150da2a1161007c578063a150da2a146102fd578063a457c2d714610310578063a9059cbb14610323578063bdfeb1e514610336578063dd62ed3e1461036b578063f2fde38b146103a457600080fd5b806370a082311461026b578063715018a61461027e57806373957289146102865780638da5cb5b146102ae57806395d89b41146102c95780639dc29fac146102ea57600080fd5b80632ff2e9dc116101155780632ff2e9dc146101f1578063313ce567146101f957806332cb6b0c14610200578063395093511461020857806340c10f191461021b578063416ae7681461023057600080fd5b806306fdde0314610152578063095ea7b31461018b57806318160ddd146101ae57806323b872dd146101c45780632e0f2625146101d7575b600080fd5b60408051808201909152600b81526a29b4b6b83632a13ab9372760a91b60208201525b6040516101829190611057565b60405180910390f35b61019e6101993660046110c8565b6103b7565b6040519015158152602001610182565b6101b66103ce565b604051908152602001610182565b61019e6101d23660046110f2565b6103de565b6101df601281565b60405160ff9091168152602001610182565b6101b6610480565b60126101df565b6101b661049a565b61019e6102163660046110c8565b6104bc565b61022e6102293660046110c8565b6104d0565b005b61024361023e36600461112e565b610580565b604080519586526020860194909452928401919091526060830152608082015260a001610182565b6101b661027936600461112e565b6105e4565b61022e610602565b61028e610638565b604080519485526020850193909352918301526060820152608001610182565b6000546040516001600160a01b039091168152602001610182565b60408051808201909152600581526429a2a1272760d91b6020820152610175565b61022e6102f83660046110c8565b610765565b61019e61030b3660046110f2565b610799565b61019e61031e3660046110c8565b610825565b61019e6103313660046110c8565b610832565b61033e61083f565b604080519687526020870195909552938501929092526060840152608083015260a082015260c001610182565b6101b6610379366004611149565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61022e6103b236600461112e565b610875565b60006103c4338484610910565b5060015b92915050565b60006103d960035490565b905090565b60006001600160a01b038416331461046b576001600160a01b0384166000908152600160209081526040808320338452909152902054828110156104695760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b6104768484846109d2565b5060019392505050565b61048c60126008611192565b61049790600a61129b565b81565b6104a660126008611192565b6104b190600a61129b565b61049790600a6112aa565b60006104c9338484610aec565b9392505050565b6000546001600160a01b031633146104fa5760405162461bcd60e51b8152600401610460906112c9565b61050660126008611192565b61051190600a61129b565b61051c90600a6112aa565b8161052660035490565b61053091906112fe565b11156105725760405162461bcd60e51b8152602060048201526011602482015270457863656564204d617820537570706c7960781b6044820152606401610460565b61057c8282610b73565b5050565b6001600160a01b0381166000908152600260205260408120546004549091908190819081906105af9043611316565b92506105ba86610bca565b6001600160a01b039096166000908152600560205260409020600201549496939592949293915050565b6001600160a01b0381166000908152600260205260408120546103c8565b6000546001600160a01b0316331461062c5760405162461bcd60e51b8152600401610460906112c9565b6106366000610c5f565b565b600080600080610646610caf565b935061066261065d6000546001600160a01b031690565b610bca565b61066c90846112fe565b600654909350610684906001600160a01b0316610bca565b61068e90846112fe565b6007549093506106a6906001600160a01b0316610bca565b6106b090846112fe565b6008549093506106c8906001600160a01b0316610bca565b6106d290846112fe565b92506000838510156106f2576106e88585611316565b9250839050610702565b6106fc8486611316565b92508490505b801561072e578061071d8469d3c21bcecceda10000006112aa565b610727919061132d565b915061075e565b61075e6040518060400160405280600f81526020016e070656e6469675f6d6178203d3d203608c1b815250610d0a565b5090919293565b6000546001600160a01b0316331461078f5760405162461bcd60e51b8152600401610460906112c9565b61057c8282610d4d565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b0385166107e65760405162461bcd60e51b81526004016104609190611057565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104769085908590610820908690611316565b610910565b60006104c9338484610799565b60006103c43384846109d2565b600354600954600a546004546000908190819061085c9043611316565b9250610866610caf565b9150600b549050909192939495565b6000546001600160a01b0316331461089f5760405162461bcd60e51b8152600401610460906112c9565b6001600160a01b0381166109045760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610460565b61090d81610c5f565b50565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b03841661095a5760405162461bcd60e51b81526004016104609190611057565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b0383166109a55760405162461bcd60e51b81526004016104609190611057565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610a1c5760405162461bcd60e51b81526004016104609190611057565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610a675760405162461bcd60e51b81526004016104609190611057565b506001600160a01b0383166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610acd5760405162461bcd60e51b81526004016104609190611057565b50610ada84836000610e0f565b610ae683836001610e0f565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610b395760405162461bcd60e51b81526004016104609190611057565b506001600160a01b0380851660009081526001602090815260408083209387168352929052205461047690859085906108209086906112fe565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610bbd5760405162461bcd60e51b81526004016104609190611057565b5061057c82826001610e0f565b6001600160a01b038116600090815260056020526040812060020154600454829190610bf69043611316565b610c009190611316565b90508015610c59576001600160a01b038316600090815260026020526040902054600a90620f4240908390610c389061058e906112aa565b610c4291906112aa565b610c4c919061132d565b610c56919061132d565b91505b50919050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008060045443610cc09190611316565b9050600a620f424061058e600a5484600954610cdc91906112aa565b610ce69190611316565b610cf091906112aa565b610cfa919061132d565b610d04919061132d565b91505090565b61090d81604051602401610d1e9190611057565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052611032565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610d975760405162461bcd60e51b81526004016104609190611057565b506001600160a01b0382166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610dfd5760405162461bcd60e51b81526004016104609190611057565b50610e0a83836000610e0f565b505050565b6001600160a01b0383166000908152600260205260408120546009805491929091610e3b908490611316565b90915550506001600160a01b038316600090815260056020526040812060010154600a805491929091610e6f908490611316565b9091555050600454610e819043611316565b600c556000610e8f84610bca565b90508015610ede576001600160a01b03841660009081526005602052604081208054839290610ebf9084906112fe565b9250508190555080600b6000828254610ed891906112fe565b90915550505b600454610eeb9043611316565b6001600160a01b0385166000908152600560205260409020600201558115610f59576001600160a01b03841660009081526002602052604081208054859290610f359084906112fe565b925050819055508260036000828254610f4e91906112fe565b90915550610fa09050565b6001600160a01b03841660009081526002602052604081208054859290610f81908490611316565b925050819055508260036000828254610f9a9190611316565b90915550505b600060045443610fb09190611316565b6001600160a01b038616600090815260026020526040812054600980549394509092839290610fe09084906112fe565b9091555060009050610ff283836112aa565b905080600a600082825461100691906112fe565b90915550506001600160a01b039096166000908152600560205260409020600101959095555050505050565b61090d8160006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b600060208083528351808285015260005b8181101561108457858101830151858201604001528201611068565b81811115611096576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146110c357600080fd5b919050565b600080604083850312156110db57600080fd5b6110e4836110ac565b946020939093013593505050565b60008060006060848603121561110757600080fd5b611110846110ac565b925061111e602085016110ac565b9150604084013590509250925092565b60006020828403121561114057600080fd5b6104c9826110ac565b6000806040838503121561115c57600080fd5b611165836110ac565b9150611173602084016110ac565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156111af576111af61117c565b019392505050565b600181815b808511156111f25781600019048211156111d8576111d861117c565b808516156111e557918102915b93841c93908002906111bc565b509250929050565b600082611209575060016103c8565b81611216575060006103c8565b816001811461122c576002811461123657611252565b60019150506103c8565b60ff8411156112475761124761117c565b50506001821b6103c8565b5060208310610133831016604e8410600b8410161715611275575081810a6103c8565b61127f83836111b7565b80600019048211156112935761129361117c565b029392505050565b60006104c960ff8416836111fa565b60008160001904831182151516156112c4576112c461117c565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156113115761131161117c565b500190565b6000828210156113285761132861117c565b500390565b60008261134a57634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212207706fc081cc74ef2e0e4a7485646d428bcf073700b92f9fd82343ee032dc622764736f6c634300080e0033";

export class SimpleBurnN__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SimpleBurnN> {
    return super.deploy(_analyticMath, overrides || {}) as Promise<SimpleBurnN>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): SimpleBurnN {
    return super.attach(address) as SimpleBurnN;
  }
  connect(signer: Signer): SimpleBurnN__factory {
    return super.connect(signer) as SimpleBurnN__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleBurnNInterface {
    return new utils.Interface(_abi) as SimpleBurnNInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleBurnN {
    return new Contract(address, _abi, signerOrProvider) as SimpleBurnN;
  }
}