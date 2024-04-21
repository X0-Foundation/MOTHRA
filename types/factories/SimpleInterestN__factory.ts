/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SimpleInterestN,
  SimpleInterestNInterface,
} from "../SimpleInterestN";

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
  "0x60806040523480156200001157600080fd5b506040516200274138038062002741833981016040819052620000349162000aaf565b6200003f33620000fb565b600d80546001600160a01b0383166001600160a01b031991821617909155436004556006805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600780548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600880549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e16012600862000af0565b620000ee90600a62000c15565b6200014b565b5062000d33565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b815260040162000198919062000c26565b60405180910390fd5b50620001b082826001620001b4565b5050565b6001600160a01b0383166000908152600260205260408120546009805491929091620001e290849062000c7e565b9091555050600c5460045460009190620001fd904362000c7e565b62000209919062000c7e565b600d5490915060009081906001600160a01b0316635aff34dc62000233610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801562000286573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002ac919062000cb3565b6001600160a01b03881660009081526005602052604090206001015460045492945090925090620002de904362000c7e565b620002ea919062000c7e565b600d5490935060009081906001600160a01b0316635aff34dc62000314610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101889052600a60648201526084016040805180830381865afa15801562000367573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200038d919062000cb3565b90925090506200039f60024362000cee565b6000036200041357620003e4600260008a6001600160a01b03166001600160a01b031681526020019081526020016000205483836200061660201b620009921760201c565b620003fe600a5486866200071360201b62000a681760201c565b6200040a919062000c7e565b600a5562000478565b6200047462000431600a5486866200061660201b620009921760201c565b6200046e600260008c6001600160a01b03166001600160a01b031681526020019081526020016000205485856200071360201b62000a681760201c565b62000759565b600a555b60045462000487904362000c7e565b600c5550600093506200049f92508691505062000782565b90508015620004f3576001600160a01b03841660009081526005602052604081208054839290620004d290849062000c98565b9250508190555080600b6000828254620004ed919062000c98565b90915550505b60045462000502904362000c7e565b6001600160a01b038516600090815260056020526040902060010155811562000576576001600160a01b038416600090815260026020526040812080548592906200054f90849062000c98565b9250508190555082600360008282546200056a919062000c98565b90915550620005c19050565b6001600160a01b03841660009081526002602052604081208054859290620005a090849062000c7e565b925050819055508260036000828254620005bb919062000c7e565b90915550505b6001600160a01b0384166000908152600260205260408120546009805491928392620005ef90849062000c98565b9250508190555080600a60008282546200060a919062000c98565b90915550505050505050565b6000808062000626868662000932565b9150915081600003620006505783818162000645576200064562000cd8565b04925050506200070c565b83821015620007075760006200066887878762000986565b90506000806200067a858585620009a4565b9150915081600003620006a75786818162000699576200069962000cd8565b04955050505050506200070c565b600087620006b68282620009da565b1690506000620006c8848484620009e8565b90506000620006e9838b81620006e257620006e262000cd8565b0462000a3f565b9050620006f7828262000a84565b985050505050505050506200070c565b600080fd5b9392505050565b6000806200072385858562000616565b905060006200073486868662000986565b111562000751576200074881600162000a92565b9150506200070c565b949350505050565b600081831115620007785762000770828462000c7e565b90506200077c565b5060005b92915050565b6001600160a01b038116600090815260056020526040812060010154600454829190620007b0904362000c7e565b620007bc919062000c7e565b600d5490915060009081906001600160a01b0316635aff34dc620007e6610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801562000839573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200085f919062000cb3565b909250905060006200087360024362000cee565b600003620008c6576001600160a01b03861660009081526002602090815260409091205490620008b29082908690869062000a6862000713821b17901c565b620008be919062000c7e565b905062000929565b620009266200090760026000896001600160a01b03166001600160a01b031681526020019081526020016000205485856200061660201b620009921760201c565b6001600160a01b03881660009081526002602052604090205462000759565b90505b95945050505050565b6000808062000942858562000aa0565b9050600062000952868662000a84565b90508082106200096a5790819003925090506200097f565b6001620009788383620009da565b0393509150505b9250929050565b6000818062000999576200099962000cd8565b838509949350505050565b600080828410620009bc5750839050818303620009d2565b6000198501620009cd8585620009da565b915091505b935093915050565b60006200070c828462000c7e565b60008062000a1483620009fc8382620009da565b8162000a0c5762000a0c62000cd8565b506000919050565b905082848162000a285762000a2862000cd8565b0462000a35868362000a84565b1795945050505050565b60006001815b600881101562000a7d5762000a728262000a6c600262000a66838962000a84565b620009da565b62000a84565b915060010162000a45565b5092915050565b60006200070c828462000d11565b60006200070c828462000c98565b60006000198284099392505050565b60006020828403121562000ac257600080fd5b81516001600160a01b03811681146200070c57600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff0382111562000b105762000b1062000ada565b019392505050565b600181815b8085111562000b5957816000190482111562000b3d5762000b3d62000ada565b8085161562000b4b57918102915b93841c939080029062000b1d565b509250929050565b60008262000b72575060016200077c565b8162000b81575060006200077c565b816001811462000b9a576002811462000ba55762000bc5565b60019150506200077c565b60ff84111562000bb95762000bb962000ada565b50506001821b6200077c565b5060208310610133831016604e8410600b841016171562000bea575081810a6200077c565b62000bf6838362000b18565b806000190482111562000c0d5762000c0d62000ada565b029392505050565b60006200070c60ff84168362000b61565b600060208083528351808285015260005b8181101562000c555785810183015185820160400152820162000c37565b8181111562000c68576000604083870101525b50601f01601f1916929092016040019392505050565b60008282101562000c935762000c9362000ada565b500390565b6000821982111562000cae5762000cae62000ada565b500190565b6000806040838503121562000cc757600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601260045260246000fd5b60008262000d0c57634e487b7160e01b600052601260045260246000fd5b500690565b600081600019048311821515161562000d2e5762000d2e62000ada565b500290565b6119fe8062000d436000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063a150da2a1161007c578063a150da2a14610301578063a457c2d714610314578063a9059cbb14610327578063bdfeb1e51461033a578063dd62ed3e1461036f578063f2fde38b146103a857600080fd5b806370a082311461026f578063715018a614610282578063739572891461028a5780638da5cb5b146102b257806395d89b41146102cd5780639dc29fac146102ee57600080fd5b80632ff2e9dc116101155780632ff2e9dc146101f5578063313ce567146101fd57806332cb6b0c14610204578063395093511461020c57806340c10f191461021f578063416ae7681461023457600080fd5b806306fdde0314610152578063095ea7b31461018f57806318160ddd146101b257806323b872dd146101c85780632e0f2625146101db575b600080fd5b60408051808201909152600f81526e29b4b6b83632a4b73a32b932b9ba2760891b60208201525b6040516101869190611690565b60405180910390f35b6101a261019d366004611701565b6103bb565b6040519015158152602001610186565b6101ba6103d2565b604051908152602001610186565b6101a26101d636600461172b565b6103e2565b6101e3601281565b60405160ff9091168152602001610186565b6101ba610485565b60126101e3565b6101ba61049f565b6101a261021a366004611701565b6104c2565b61023261022d366004611701565b6104cf565b005b610247610242366004611767565b610580565b604080519586526020860194909452928401919091526060830152608082015260a001610186565b6101ba61027d366004611767565b6105e4565b610232610602565b610292610638565b604080519485526020850193909352918301526060820152608001610186565b6000546040516001600160a01b039091168152602001610186565b60408051808201909152600581526429a2a92ba760d91b6020820152610179565b6102326102fc366004611701565b6107e7565b6101a261030f36600461172b565b61081b565b6101a2610322366004611701565b6108a7565b6101a2610335366004611701565b6108b4565b6103426108c1565b604080519687526020870195909552938501929092526060840152608083015260a082015260c001610186565b6101ba61037d366004611782565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102326103b6366004611767565b6108f7565b60006103c8338484610aa6565b5060015b92915050565b60006103dd60035490565b905090565b60006001600160a01b038416331461046f576001600160a01b03841660009081526001602090815260408083203384529091529020548281101561046d5760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b61047a848484610b68565b5060015b9392505050565b610491601260086117cb565b61049c90600a6118d4565b81565b6104ab601260086117cb565b6104b690600a6118d4565b61049c906103e86118e3565b600061047e338484610c82565b6000546001600160a01b031633146104f95760405162461bcd60e51b815260040161046490611902565b610505601260086117cb565b61051090600a6118d4565b61051c906103e86118e3565b8161052660035490565b6105309190611937565b11156105725760405162461bcd60e51b8152602060048201526011602482015270457863656564204d617820537570706c7960781b6044820152606401610464565b61057c8282610d09565b5050565b6001600160a01b0381166000908152600260205260408120546004549091908190819081906105af904361194f565b92506105ba86610d60565b6001600160a01b039096166000908152600560205260409020600101549496939592949293915050565b6001600160a01b0381166000908152600260205260408120546103cc565b6000546001600160a01b0316331461062c5760405162461bcd60e51b815260040161046490611902565b6106366000610ed4565b565b600080600080610646610f24565b935061066261065d6000546001600160a01b031690565b610d60565b61066c9084611937565b600654909350610684906001600160a01b0316610d60565b61068e9084611937565b6007549093506106a6906001600160a01b0316610d60565b6106b09084611937565b6008549093506106c8906001600160a01b0316610d60565b6106d29084611937565b9250600083851015610730576106e8858561194f565b925083905061072b6040518060400160405280601a81526020017f636865636b202d2d2d206d617267696e616c2067726561746572000000000000815250611006565b6107b8565b61073a848661194f565b9250849050838511156107855761072b6040518060400160405280601c81526020017f636865636b202d2d2d20636f6c6c656374697665206772656174657200000000815250611006565b6107b86040518060400160405280601281526020017118da1958dac80b4b4b4818985b185b98d95960721b815250611006565b80156107e057806107d38469d3c21bcecceda10000006118e3565b6107dd919061197c565b91505b5090919293565b6000546001600160a01b031633146108115760405162461bcd60e51b815260040161046490611902565b61057c8282611049565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b0385166108685760405162461bcd60e51b81526004016104649190611690565b506001600160a01b0380851660009081526001602090815260408083209387168352929052205461047a90859085906108a290869061194f565b610aa6565b600061047e33848461081b565b60006103c8338484610b68565b600354600954600a54600454600090819081906108de904361194f565b92506108e8610f24565b9150600b549050909192939495565b6000546001600160a01b031633146109215760405162461bcd60e51b815260040161046490611902565b6001600160a01b0381166109865760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610464565b61098f81610ed4565b50565b60008060006109a1868661110b565b91509150816000036109c6578381816109bc576109bc611966565b049250505061047e565b8382101561014d5760006109db878787611158565b90506000806109eb858585611173565b9150915081600003610a1357868181610a0657610a06611966565b049550505050505061047e565b600087610a2160008a6111a4565b1690506000610a318484846111b0565b90506000610a4d838b81610a4757610a47611966565b046111fd565b9050610a59828261123a565b9850505050505050505061047e565b600080610a76858585610992565b90506000610a85868686611158565b1115610a9e57610a96816001611246565b91505061047e565b949350505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610af05760405162461bcd60e51b81526004016104649190611690565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610b3b5760405162461bcd60e51b81526004016104649190611690565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610bb25760405162461bcd60e51b81526004016104649190611690565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610bfd5760405162461bcd60e51b81526004016104649190611690565b506001600160a01b0383166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610c635760405162461bcd60e51b81526004016104649190611690565b50610c7084836000611252565b610c7c83836001611252565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610ccf5760405162461bcd60e51b81526004016104649190611690565b506001600160a01b0380851660009081526001602090815260408083209387168352929052205461047a90859085906108a2908690611937565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610d535760405162461bcd60e51b81526004016104649190611690565b5061057c82826001611252565b6001600160a01b038116600090815260056020526040812060010154600454829190610d8c904361194f565b610d96919061194f565b600d5490915060009081906001600160a01b0316635aff34dc610dbe610309620186a0611937565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610e10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e349190611990565b90925090506000610e466002436119b4565b600003610e82576001600160a01b038616600090815260026020526040902054610e71818585610a68565b610e7b919061194f565b9050610ecb565b6001600160a01b038616600090815260026020526040902054610ec890610eaa908585610992565b6001600160a01b038816600090815260026020526040902054611633565b90505b95945050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080600c5460045443610f38919061194f565b610f42919061194f565b600d5490915060009081906001600160a01b0316635aff34dc610f6a610309620186a0611937565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610fbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fe09190611990565b91509150600954610ff4600a548484610a68565b610ffe919061194f565b935050505090565b61098f8160405160240161101a9190611690565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052611657565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b0383166110935760405162461bcd60e51b81526004016104649190611690565b506001600160a01b0382166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b815250906110f95760405162461bcd60e51b81526004016104649190611690565b5061110683836000611252565b505050565b600080600061111a8585611660565b90506000611128868661123a565b905080821061113e579081900392509050611151565b600161114a83836111a4565b0393509150505b9250929050565b6000818061116857611168611966565b838509949350505050565b600080828410611189575083905081830361119c565b6001850361119785856111a4565b915091505b935093915050565b600061047e828461194f565b6000806111d7836111c26000866111a4565b816111cf576111cf611966565b506000919050565b90508284816111e8576111e8611966565b046111f3868361123a565b1795945050505050565b60006001815b60088110156112335761122982611224600261121f868961123a565b6111a4565b61123a565b9150600101611203565b5092915050565b600061047e82846118e3565b600061047e8284611937565b6001600160a01b038316600090815260026020526040812054600980549192909161127e90849061194f565b9091555050600c5460045460009190611297904361194f565b6112a1919061194f565b600d5490915060009081906001600160a01b0316635aff34dc6112c9610309620186a0611937565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801561131b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133f9190611990565b6001600160a01b0388166000908152600560205260409020600101546004549294509092509061136f904361194f565b611379919061194f565b600d5490935060009081906001600160a01b0316635aff34dc6113a1610309620186a0611937565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101889052600a60648201526084016040805180830381865afa1580156113f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114179190611990565b90925090506114276002436119b4565b600003611471576001600160a01b038816600090815260026020526040902054611452908383610992565b61145f600a548686610a68565b611469919061194f565b600a556114ae565b6114aa611481600a548686610992565b6001600160a01b038a166000908152600260205260409020546114a5908585610a68565b611633565b600a555b6004546114bb904361194f565b600c81905550505050505060006114d184610d60565b90508015611520576001600160a01b03841660009081526005602052604081208054839290611501908490611937565b9250508190555080600b600082825461151a9190611937565b90915550505b60045461152d904361194f565b6001600160a01b038516600090815260056020526040902060010155811561159b576001600160a01b03841660009081526002602052604081208054859290611577908490611937565b9250508190555082600360008282546115909190611937565b909155506115e29050565b6001600160a01b038416600090815260026020526040812080548592906115c390849061194f565b9250508190555082600360008282546115dc919061194f565b90915550505b6001600160a01b038416600090815260026020526040812054600980549192839261160e908490611937565b9250508190555080600a60008282546116279190611937565b90915550505050505050565b60008183111561164e57611647828461194f565b90506103cc565b50600092915050565b61098f8161166f565b60006000198284099392505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b600060208083528351808285015260005b818110156116bd578581018301518582016040015282016116a1565b818111156116cf576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146116fc57600080fd5b919050565b6000806040838503121561171457600080fd5b61171d836116e5565b946020939093013593505050565b60008060006060848603121561174057600080fd5b611749846116e5565b9250611757602085016116e5565b9150604084013590509250925092565b60006020828403121561177957600080fd5b61047e826116e5565b6000806040838503121561179557600080fd5b61179e836116e5565b91506117ac602084016116e5565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156117e8576117e86117b5565b019392505050565b600181815b8085111561182b578160001904821115611811576118116117b5565b8085161561181e57918102915b93841c93908002906117f5565b509250929050565b600082611842575060016103cc565b8161184f575060006103cc565b8160018114611865576002811461186f5761188b565b60019150506103cc565b60ff841115611880576118806117b5565b50506001821b6103cc565b5060208310610133831016604e8410600b84101617156118ae575081810a6103cc565b6118b883836117f0565b80600019048211156118cc576118cc6117b5565b029392505050565b600061047e60ff841683611833565b60008160001904831182151516156118fd576118fd6117b5565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561194a5761194a6117b5565b500190565b600082821015611961576119616117b5565b500390565b634e487b7160e01b600052601260045260246000fd5b60008261198b5761198b611966565b500490565b600080604083850312156119a357600080fd5b505080516020909101519092909150565b6000826119c3576119c3611966565b50069056fea2646970667358221220338225ad65807c28bd5191f54bc30b3f74c0a130b72e1e4de65f9c401180d52f64736f6c634300080e0033";

export class SimpleInterestN__factory extends ContractFactory {
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
  ): Promise<SimpleInterestN> {
    return super.deploy(
      _analyticMath,
      overrides || {}
    ) as Promise<SimpleInterestN>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): SimpleInterestN {
    return super.attach(address) as SimpleInterestN;
  }
  connect(signer: Signer): SimpleInterestN__factory {
    return super.connect(signer) as SimpleInterestN__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleInterestNInterface {
    return new utils.Interface(_abi) as SimpleInterestNInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleInterestN {
    return new Contract(address, _abi, signerOrProvider) as SimpleInterestN;
  }
}
