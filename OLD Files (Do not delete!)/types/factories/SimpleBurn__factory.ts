/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SimpleBurn, SimpleBurnInterface } from "../SimpleBurn";

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
    inputs: [],
    name: "accRewardPerShare12",
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
    inputs: [],
    name: "alpha",
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
    name: "distCycle",
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
    name: "getTotalState",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_latestBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_accRewardPerShare12",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewordPool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalPendingReward",
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
        name: "_reward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userPendingReward",
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
    name: "rewardPool",
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
  {
    inputs: [],
    name: "upadateWithTotalShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019ea380380620019ea833981016040819052620000349162000431565b6200003f33620000fb565b600c80546001600160a01b0383166001600160a01b031991821617909155436004556009805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600a80548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600b80549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e16012600862000479565b620000ee90600a620005a0565b6200014b565b5062000683565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b8152600401620001989190620005b1565b60405180910390fd5b50620001b082826001620001b4565b5050565b620001be620002f4565b6000620001cb846200038f565b905080156200021d578060066000828254620001e8919062000609565b90915550506001600160a01b038416600090815260086020526040812080548392906200021790849062000623565b90915550505b811562000275576001600160a01b038416600090815260026020526040812080548592906200024e90849062000623565b92505081905550826003600082825462000269919062000623565b90915550620002c09050565b6001600160a01b038416600090815260026020526040812080548592906200029f90849062000609565b925050819055508260036000828254620002ba919062000609565b90915550505b600454620002cf904362000609565b6001600160a01b03909416600090815260086020526040902060010193909355505050565b60006005546004544362000309919062000609565b62000315919062000609565b905080156200038c576000600a620f42408361058e6003546200033991906200063e565b6200034591906200063e565b62000351919062000660565b6200035d919062000660565b9050806006600082825462000373919062000623565b909155505060045462000387904362000609565b600555505b50565b6001600160a01b038116600090815260086020526040812060010154600454829190620003bd904362000609565b620003c9919062000609565b905080156200042b576001600160a01b038316600090815260026020526040902054600a90620f4240908390620004049061058e906200063e565b6200041091906200063e565b6200041c919062000660565b62000428919062000660565b91505b50919050565b6000602082840312156200044457600080fd5b81516001600160a01b03811681146200045c57600080fd5b9392505050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff0382111562000499576200049962000463565b019392505050565b600181815b80851115620004e2578160001904821115620004c657620004c662000463565b80851615620004d457918102915b93841c9390800290620004a6565b509250929050565b600082620004fb575060016200059a565b816200050a575060006200059a565b81600181146200052357600281146200052e576200054e565b60019150506200059a565b60ff84111562000542576200054262000463565b50506001821b6200059a565b5060208310610133831016604e8410600b841016171562000573575081810a6200059a565b6200057f8383620004a1565b806000190482111562000596576200059662000463565b0290505b92915050565b60006200045c60ff841683620004ea565b600060208083528351808285015260005b81811015620005e057858101830151858201604001528201620005c2565b81811115620005f3576000604083870101525b50601f01601f1916929092016040019392505050565b6000828210156200061e576200061e62000463565b500390565b6000821982111562000639576200063962000463565b500190565b60008160001904831182151516156200065b576200065b62000463565b500290565b6000826200067e57634e487b7160e01b600052601260045260246000fd5b500490565b61135780620006936000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d1daefb411610071578063d1daefb4146103cc578063db1d0fd5146103d5578063dd62ed3e146103dd578063f2fde38b1461041657600080fd5b8063a457c2d714610376578063a9059cbb14610389578063bdfeb1e51461039c57600080fd5b80638da5cb5b116100d35780638da5cb5b1461031557806395d89b41146103305780639dc29fac14610350578063a150da2a1461036357600080fd5b806370a08231146102f2578063715018a614610305578063739572891461030d57600080fd5b806332cb6b0c11610166578063416ae76811610140578063416ae768146102a657806357627e93146102d957806366666aa9146102e15780636863909e146102ea57600080fd5b806332cb6b0c14610276578063395093511461027e57806340c10f191461029157600080fd5b806323b872dd116101a257806323b872dd1461023a5780632e0f26251461024d5780632ff2e9dc14610267578063313ce5671461026f57600080fd5b806306fdde03146101c9578063095ea7b31461020157806318160ddd14610224575b600080fd5b60408051808201909152600a81526929b4b6b83632a13ab93760b11b60208201525b6040516101f89190611029565b60405180910390f35b61021461020f36600461109a565b610429565b60405190151581526020016101f8565b61022c610440565b6040519081526020016101f8565b6102146102483660046110c4565b610450565b610255601281565b60405160ff90911681526020016101f8565b61022c6104f2565b6012610255565b61022c61050c565b61021461028c36600461109a565b61052e565b6102a461029f36600461109a565b610542565b005b6102b96102b4366004611100565b6105f2565b6040805194855260208501939093529183015260608201526080016101f8565b61022c601e81565b61022c60065481565b6102a461062b565b61022c610300366004611100565b6106b5565b6102a46106d3565b6102b9610709565b6000546040516001600160a01b0390911681526020016101f8565b60408051808201909152600481526329a2a12760e11b60208201526101eb565b6102a461035e36600461109a565b610836565b6102146103713660046110c4565b61086a565b61021461038436600461109a565b6108f6565b61021461039736600461109a565b610903565b6103a4610910565b604080519586526020860194909452928401919091526060830152608082015260a0016101f8565b61022c60075481565b61022c600c81565b61022c6103eb36600461111b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102a4610424366004611100565b61092e565b60006104363384846109c6565b5060015b92915050565b600061044b60035490565b905090565b60006001600160a01b03841633146104dd576001600160a01b0384166000908152600160209081526040808320338452909152902054828110156104db5760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b6104e8848484610a88565b5060019392505050565b6104fe60126008611164565b61050990600a61126d565b81565b61051860126008611164565b61052390600a61126d565b61050990600a61127c565b600061053b338484610ba2565b9392505050565b6000546001600160a01b0316331461056c5760405162461bcd60e51b81526004016104d29061129b565b61057860126008611164565b61058390600a61126d565b61058e90600a61127c565b8161059860035490565b6105a291906112d0565b11156105e45760405162461bcd60e51b8152602060048201526011602482015270457863656564204d617820537570706c7960781b60448201526064016104d2565b6105ee8282610c29565b5050565b6001600160a01b038116600090815260026020908152604080832054600890925282205490918061062285610c80565b90509193509193565b60006005546004544361063e91906112e8565b61064891906112e8565b905080156106b2576000600a620f42408361058e600354610669919061127c565b610673919061127c565b61067d91906112ff565b61068791906112ff565b9050806006600082825461069b91906112d0565b90915550506004546106ad90436112e8565b600555505b50565b6001600160a01b03811660009081526002602052604081205461043a565b6000546001600160a01b031633146106fd5760405162461bcd60e51b81526004016104d29061129b565b6107076000610d15565b565b600080600080610717610d65565b935061073361072e6000546001600160a01b031690565b610c80565b61073d90846112d0565b600954909350610755906001600160a01b0316610c80565b61075f90846112d0565b600a54909350610777906001600160a01b0316610c80565b61078190846112d0565b600b54909350610799906001600160a01b0316610c80565b6107a390846112d0565b92506000838510156107c3576107b985856112e8565b92508390506107d3565b6107cd84866112e8565b92508490505b80156107ff57806107ee8469d3c21bcecceda100000061127c565b6107f891906112ff565b915061082f565b61082f6040518060400160405280600f81526020016e070656e6469675f6d6178203d3d203608c1b815250610dd4565b5090919293565b6000546001600160a01b031633146108605760405162461bcd60e51b81526004016104d29061129b565b6105ee8282610e17565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b0385166108b75760405162461bcd60e51b81526004016104d29190611029565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104e890859085906108f19086906112e8565b6109c6565b600061053b33848461086a565b6000610436338484610a88565b60035460055460065460009081610925610d65565b90509091929394565b6000546001600160a01b031633146109585760405162461bcd60e51b81526004016104d29061129b565b6001600160a01b0381166109bd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104d2565b6106b281610d15565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610a105760405162461bcd60e51b81526004016104d29190611029565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610a5b5760405162461bcd60e51b81526004016104d29190611029565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610ad25760405162461bcd60e51b81526004016104d29190611029565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610b1d5760405162461bcd60e51b81526004016104d29190611029565b506001600160a01b0383166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610b835760405162461bcd60e51b81526004016104d29190611029565b50610b9084836000610ed9565b610b9c83836001610ed9565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610bef5760405162461bcd60e51b81526004016104d29190611029565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104e890859085906108f19086906112d0565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610c735760405162461bcd60e51b81526004016104d29190611029565b506105ee82826001610ed9565b6001600160a01b038116600090815260086020526040812060010154600454829190610cac90436112e8565b610cb691906112e8565b90508015610d0f576001600160a01b038316600090815260026020526040902054600a90620f4240908390610cee9061058e9061127c565b610cf8919061127c565b610d0291906112ff565b610d0c91906112ff565b91505b50919050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60065460055460045460009190610d7c90436112e8565b610d8691906112e8565b90508015610dd057600a620f42408261058e600354610da5919061127c565b610daf919061127c565b610db991906112ff565b610dc391906112ff565b610dcd90836112d0565b91505b5090565b6106b281604051602401610de89190611029565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052611004565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610e615760405162461bcd60e51b81526004016104d29190611029565b506001600160a01b0382166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610ec75760405162461bcd60e51b81526004016104d29190611029565b50610ed483836000610ed9565b505050565b610ee161062b565b6000610eec84610c80565b90508015610f39578060066000828254610f0691906112e8565b90915550506001600160a01b03841660009081526008602052604081208054839290610f339084906112d0565b90915550505b8115610f8b576001600160a01b03841660009081526002602052604081208054859290610f679084906112d0565b925050819055508260036000828254610f8091906112d0565b90915550610fd29050565b6001600160a01b03841660009081526002602052604081208054859290610fb39084906112e8565b925050819055508260036000828254610fcc91906112e8565b90915550505b600454610fdf90436112e8565b6001600160a01b03909416600090815260086020526040902060010193909355505050565b6106b28160006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b600060208083528351808285015260005b818110156110565785810183015185820160400152820161103a565b81811115611068576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461109557600080fd5b919050565b600080604083850312156110ad57600080fd5b6110b68361107e565b946020939093013593505050565b6000806000606084860312156110d957600080fd5b6110e28461107e565b92506110f06020850161107e565b9150604084013590509250925092565b60006020828403121561111257600080fd5b61053b8261107e565b6000806040838503121561112e57600080fd5b6111378361107e565b91506111456020840161107e565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156111815761118161114e565b019392505050565b600181815b808511156111c45781600019048211156111aa576111aa61114e565b808516156111b757918102915b93841c939080029061118e565b509250929050565b6000826111db5750600161043a565b816111e85750600061043a565b81600181146111fe576002811461120857611224565b600191505061043a565b60ff8411156112195761121961114e565b50506001821b61043a565b5060208310610133831016604e8410600b8410161715611247575081810a61043a565b6112518383611189565b80600019048211156112655761126561114e565b029392505050565b600061053b60ff8416836111cc565b60008160001904831182151516156112965761129661114e565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156112e3576112e361114e565b500190565b6000828210156112fa576112fa61114e565b500390565b60008261131c57634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220eb8cbc9940b62cf2cf318d54aecfe8bbfac6a66edb1d99928a7b42bba205da9d64736f6c634300080e0033";

export class SimpleBurn__factory extends ContractFactory {
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
  ): Promise<SimpleBurn> {
    return super.deploy(_analyticMath, overrides || {}) as Promise<SimpleBurn>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): SimpleBurn {
    return super.attach(address) as SimpleBurn;
  }
  connect(signer: Signer): SimpleBurn__factory {
    return super.connect(signer) as SimpleBurn__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleBurnInterface {
    return new utils.Interface(_abi) as SimpleBurnInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleBurn {
    return new Contract(address, _abi, signerOrProvider) as SimpleBurn;
  }
}