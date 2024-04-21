/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CompoundInterestN,
  CompoundInterestNInterface,
} from "../CompoundInterestN";

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
  "0x60806040523480156200001157600080fd5b50604051620025ba380380620025ba833981016040819052620000349162000aaf565b6200003f33620000fb565b600d80546001600160a01b0383166001600160a01b031991821617909155436004556006805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600780548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600880549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e16012600862000af0565b620000ee90600a62000c15565b6200014b565b5062000d33565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b815260040162000198919062000c26565b60405180910390fd5b50620001b082826001620001b4565b5050565b6001600160a01b0383166000908152600260205260408120546009805491929091620001e290849062000c7e565b9091555050600c5460045460009190620001fd904362000c7e565b62000209919062000c7e565b600d5490915060009081906001600160a01b0316635aff34dc62000233610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801562000286573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002ac919062000cb3565b6001600160a01b03881660009081526005602052604090206001015460045492945090925090620002de904362000c7e565b620002ea919062000c7e565b600d5490935060009081906001600160a01b0316635aff34dc62000314610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101889052600a60648201526084016040805180830381865afa15801562000367573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200038d919062000cb3565b90925090506200039f60024362000cee565b6000036200041357620003e4600260008a6001600160a01b03166001600160a01b031681526020019081526020016000205483836200061660201b620008511760201c565b620003fe600a5486866200071360201b620009271760201c565b6200040a919062000c7e565b600a5562000478565b6200047462000431600a5486866200061660201b620008511760201c565b6200046e600260008c6001600160a01b03166001600160a01b031681526020019081526020016000205485856200071360201b620009271760201c565b62000759565b600a555b60045462000487904362000c7e565b600c5550600093506200049f92508691505062000782565b90508015620004f3576001600160a01b03841660009081526002602052604081208054839290620004d290849062000c98565b9250508190555080600b6000828254620004ed919062000c98565b90915550505b60045462000502904362000c7e565b6001600160a01b038516600090815260056020526040902060010155811562000576576001600160a01b038416600090815260026020526040812080548592906200054f90849062000c98565b9250508190555082600360008282546200056a919062000c98565b90915550620005c19050565b6001600160a01b03841660009081526002602052604081208054859290620005a090849062000c7e565b925050819055508260036000828254620005bb919062000c7e565b90915550505b6001600160a01b0384166000908152600260205260408120546009805491928392620005ef90849062000c98565b9250508190555080600a60008282546200060a919062000c98565b90915550505050505050565b6000808062000626868662000932565b9150915081600003620006505783818162000645576200064562000cd8565b04925050506200070c565b83821015620007075760006200066887878762000986565b90506000806200067a858585620009a4565b9150915081600003620006a75786818162000699576200069962000cd8565b04955050505050506200070c565b600087620006b68282620009da565b1690506000620006c8848484620009e8565b90506000620006e9838b81620006e257620006e262000cd8565b0462000a3f565b9050620006f7828262000a84565b985050505050505050506200070c565b600080fd5b9392505050565b6000806200072385858562000616565b905060006200073486868662000986565b111562000751576200074881600162000a92565b9150506200070c565b949350505050565b600081831115620007785762000770828462000c7e565b90506200077c565b5060005b92915050565b6001600160a01b038116600090815260056020526040812060010154600454829190620007b0904362000c7e565b620007bc919062000c7e565b600d5490915060009081906001600160a01b0316635aff34dc620007e6610309620186a062000c98565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801562000839573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200085f919062000cb3565b909250905060006200087360024362000cee565b600003620008c6576001600160a01b03861660009081526002602090815260409091205490620008b2908290869086906200092762000713821b17901c565b620008be919062000c7e565b905062000929565b620009266200090760026000896001600160a01b03166001600160a01b031681526020019081526020016000205485856200061660201b620008511760201c565b6001600160a01b03881660009081526002602052604090205462000759565b90505b95945050505050565b6000808062000942858562000aa0565b9050600062000952868662000a84565b90508082106200096a5790819003925090506200097f565b6001620009788383620009da565b0393509150505b9250929050565b6000818062000999576200099962000cd8565b838509949350505050565b600080828410620009bc5750839050818303620009d2565b6000198501620009cd8585620009da565b915091505b935093915050565b60006200070c828462000c7e565b60008062000a1483620009fc8382620009da565b8162000a0c5762000a0c62000cd8565b506000919050565b905082848162000a285762000a2862000cd8565b0462000a35868362000a84565b1795945050505050565b60006001815b600881101562000a7d5762000a728262000a6c600262000a66838962000a84565b620009da565b62000a84565b915060010162000a45565b5092915050565b60006200070c828462000d11565b60006200070c828462000c98565b60006000198284099392505050565b60006020828403121562000ac257600080fd5b81516001600160a01b03811681146200070c57600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff0382111562000b105762000b1062000ada565b019392505050565b600181815b8085111562000b5957816000190482111562000b3d5762000b3d62000ada565b8085161562000b4b57918102915b93841c939080029062000b1d565b509250929050565b60008262000b72575060016200077c565b8162000b81575060006200077c565b816001811462000b9a576002811462000ba55762000bc5565b60019150506200077c565b60ff84111562000bb95762000bb962000ada565b50506001821b6200077c565b5060208310610133831016604e8410600b841016171562000bea575081810a6200077c565b62000bf6838362000b18565b806000190482111562000c0d5762000c0d62000ada565b029392505050565b60006200070c60ff84168362000b61565b600060208083528351808285015260005b8181101562000c555785810183015185820160400152820162000c37565b8181111562000c68576000604083870101525b50601f01601f1916929092016040019392505050565b60008282101562000c935762000c9362000ada565b500390565b6000821982111562000cae5762000cae62000ada565b500190565b6000806040838503121562000cc757600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601260045260246000fd5b60008262000d0c57634e487b7160e01b600052601260045260246000fd5b500690565b600081600019048311821515161562000d2e5762000d2e62000ada565b500290565b6118778062000d436000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063a150da2a1161007c578063a150da2a14610303578063a457c2d714610316578063a9059cbb14610329578063bdfeb1e51461033c578063dd62ed3e14610371578063f2fde38b146103aa57600080fd5b806370a0823114610271578063715018a614610284578063739572891461028c5780638da5cb5b146102b457806395d89b41146102cf5780639dc29fac146102f057600080fd5b80632ff2e9dc116101155780632ff2e9dc146101f7578063313ce567146101ff57806332cb6b0c14610206578063395093511461020e57806340c10f1914610221578063416ae7681461023657600080fd5b806306fdde0314610152578063095ea7b31461019157806318160ddd146101b457806323b872dd146101ca5780632e0f2625146101dd575b600080fd5b60408051808201909152601181527021b7b6b837bab73224b73a32b932b9ba2760791b60208201525b6040516101889190611509565b60405180910390f35b6101a461019f36600461157a565b6103bd565b6040519015158152602001610188565b6101bc6103d4565b604051908152602001610188565b6101a46101d83660046115a4565b6103e3565b6101e5601281565b60405160ff9091168152602001610188565b6101bc610486565b60126101e5565b6101bc6104a0565b6101a461021c36600461157a565b6104c3565b61023461022f36600461157a565b6104d0565b005b6102496102443660046115e0565b610508565b604080519586526020860194909452928401919091526060830152608082015260a001610188565b6101bc61027f3660046115e0565b61056c565b610234610577565b6102946105ad565b604080519485526020850193909352918301526060820152608001610188565b6000546040516001600160a01b039091168152602001610188565b60408051808201909152600581526421a2a92ba760d91b602082015261017b565b6102346102fe36600461157a565b6106a6565b6101a46103113660046115a4565b6106da565b6101a461032436600461157a565b610766565b6101a461033736600461157a565b610773565b610344610780565b604080519687526020870195909552938501929092526060840152608083015260a082015260c001610188565b6101bc61037f3660046115fb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102346103b83660046115e0565b6107b6565b60006103ca338484610965565b5060015b92915050565b60006103de610a27565b905090565b60006001600160a01b0384163314610470576001600160a01b03841660009081526001602090815260408083203384529091529020548281101561046e5760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b61047b848484610a3e565b5060015b9392505050565b61049260126008611644565b61049d90600a61174d565b81565b6104ac60126008611644565b6104b790600a61174d565b61049d906103e861175c565b600061047f338484610b4a565b6000546001600160a01b031633146104fa5760405162461bcd60e51b81526004016104659061177b565b6105048282610bd1565b5050565b6001600160a01b03811660009081526002602052604081205460045490919081908190819061053790436117b0565b925061054286610c28565b6001600160a01b039096166000908152600560205260409020600101549496939592949293915050565b60006103ce82610d9c565b6000546001600160a01b031633146105a15760405162461bcd60e51b81526004016104659061177b565b6105ab6000610dca565b565b6000806000806105bb610e1a565b93506105d76105d26000546001600160a01b031690565b610c28565b6105e190846117c7565b6006549093506105f9906001600160a01b0316610c28565b61060390846117c7565b60075490935061061b906001600160a01b0316610c28565b61062590846117c7565b60085490935061063d906001600160a01b0316610c28565b61064790846117c7565b92506000838510156106675761065d85856117b0565b9250839050610677565b61067184866117b0565b92508490505b801561069f57806106928469d3c21bcecceda100000061175c565b61069c91906117f5565b91505b5090919293565b6000546001600160a01b031633146106d05760405162461bcd60e51b81526004016104659061177b565b6105048282610efa565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b0385166107275760405162461bcd60e51b81526004016104659190611509565b506001600160a01b0380851660009081526001602090815260408083209387168352929052205461047b90859085906107619086906117b0565b610965565b600061047f3384846106da565b60006103ca338484610a3e565b600354600954600a546004546000908190819061079d90436117b0565b92506107a7610e1a565b9150600b549050909192939495565b6000546001600160a01b031633146107e05760405162461bcd60e51b81526004016104659061177b565b6001600160a01b0381166108455760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610465565b61084e81610dca565b50565b60008060006108608686610fae565b91509150816000036108855783818161087b5761087b6117df565b049250505061047f565b8382101561014d57600061089a878787610ffb565b90506000806108aa858585611016565b91509150816000036108d2578681816108c5576108c56117df565b049550505050505061047f565b6000876108e060008a611047565b16905060006108f0848484611053565b9050600061090c838b81610906576109066117df565b046110a0565b905061091882826110dd565b9850505050505050505061047f565b600080610935858585610851565b90506000610944868686610ffb565b111561095d576109558160016110e9565b91505061047f565b949350505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b0384166109af5760405162461bcd60e51b81526004016104659190611509565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b0383166109fa5760405162461bcd60e51b81526004016104659190611509565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b6000610a31610e1a565b6003546103de91906117c7565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610a885760405162461bcd60e51b81526004016104659190611509565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610ad35760405162461bcd60e51b81526004016104659190611509565b506000610adf84610d9c565b9050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610b2b5760405162461bcd60e51b81526004016104659190611509565b50610b38848360006110f5565b610b44838360016110f5565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610b975760405162461bcd60e51b81526004016104659190611509565b506001600160a01b0380851660009081526001602090815260408083209387168352929052205461047b90859085906107619086906117c7565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610c1b5760405162461bcd60e51b81526004016104659190611509565b50610504828260016110f5565b6001600160a01b038116600090815260056020526040812060010154600454829190610c5490436117b0565b610c5e91906117b0565b600d5490915060009081906001600160a01b0316635aff34dc610c86610309620186a06117c7565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610cd8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfc9190611809565b90925090506000610d0e60024361182d565b600003610d4a576001600160a01b038616600090815260026020526040902054610d39818585610927565b610d4391906117b0565b9050610d93565b6001600160a01b038616600090815260026020526040902054610d9090610d72908585610851565b6001600160a01b0388166000908152600260205260409020546114d6565b90505b95945050505050565b6000610da782610c28565b6001600160a01b0383166000908152600260205260409020546103ce91906117c7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080600c5460045443610e2e91906117b0565b610e3891906117b0565b600d5490915060009081906001600160a01b0316635aff34dc610e60610309620186a06117c7565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610eb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed69190611809565b91509150610ef2610eea600a548484610927565b6009546114d6565b935050505090565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610f445760405162461bcd60e51b81526004016104659190611509565b506000610f5083610d9c565b9050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610f9c5760405162461bcd60e51b81526004016104659190611509565b50610fa9838360006110f5565b505050565b6000806000610fbd85856114fa565b90506000610fcb86866110dd565b9050808210610fe1579081900392509050610ff4565b6001610fed8383611047565b0393509150505b9250929050565b6000818061100b5761100b6117df565b838509949350505050565b60008082841061102c575083905081830361103f565b6001850361103a8585611047565b915091505b935093915050565b600061047f82846117b0565b60008061107a83611065600086611047565b81611072576110726117df565b506000919050565b905082848161108b5761108b6117df565b0461109686836110dd565b1795945050505050565b60006001815b60088110156110d6576110cc826110c760026110c286896110dd565b611047565b6110dd565b91506001016110a6565b5092915050565b600061047f828461175c565b600061047f82846117c7565b6001600160a01b03831660009081526002602052604081205460098054919290916111219084906117b0565b9091555050600c546004546000919061113a90436117b0565b61114491906117b0565b600d5490915060009081906001600160a01b0316635aff34dc61116c610309620186a06117c7565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa1580156111be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e29190611809565b6001600160a01b0388166000908152600560205260409020600101546004549294509092509061121290436117b0565b61121c91906117b0565b600d5490935060009081906001600160a01b0316635aff34dc611244610309620186a06117c7565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101889052600a60648201526084016040805180830381865afa158015611296573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ba9190611809565b90925090506112ca60024361182d565b600003611314576001600160a01b0388166000908152600260205260409020546112f5908383610851565b611302600a548686610927565b61130c91906117b0565b600a55611351565b61134d611324600a548686610851565b6001600160a01b038a16600090815260026020526040902054611348908585610927565b6114d6565b600a555b60045461135e90436117b0565b600c819055505050505050600061137484610c28565b905080156113c3576001600160a01b038416600090815260026020526040812080548392906113a49084906117c7565b9250508190555080600b60008282546113bd91906117c7565b90915550505b6004546113d090436117b0565b6001600160a01b038516600090815260056020526040902060010155811561143e576001600160a01b0384166000908152600260205260408120805485929061141a9084906117c7565b92505081905550826003600082825461143391906117c7565b909155506114859050565b6001600160a01b038416600090815260026020526040812080548592906114669084906117b0565b92505081905550826003600082825461147f91906117b0565b90915550505b6001600160a01b03841660009081526002602052604081205460098054919283926114b19084906117c7565b9250508190555080600a60008282546114ca91906117c7565b90915550505050505050565b6000818311156114f1576114ea82846117b0565b90506103ce565b50600092915050565b60006000198284099392505050565b600060208083528351808285015260005b818110156115365785810183015185820160400152820161151a565b81811115611548576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461157557600080fd5b919050565b6000806040838503121561158d57600080fd5b6115968361155e565b946020939093013593505050565b6000806000606084860312156115b957600080fd5b6115c28461155e565b92506115d06020850161155e565b9150604084013590509250925092565b6000602082840312156115f257600080fd5b61047f8261155e565b6000806040838503121561160e57600080fd5b6116178361155e565b91506116256020840161155e565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156116615761166161162e565b019392505050565b600181815b808511156116a457816000190482111561168a5761168a61162e565b8085161561169757918102915b93841c939080029061166e565b509250929050565b6000826116bb575060016103ce565b816116c8575060006103ce565b81600181146116de57600281146116e857611704565b60019150506103ce565b60ff8411156116f9576116f961162e565b50506001821b6103ce565b5060208310610133831016604e8410600b8410161715611727575081810a6103ce565b6117318383611669565b80600019048211156117455761174561162e565b029392505050565b600061047f60ff8416836116ac565b60008160001904831182151516156117765761177661162e565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000828210156117c2576117c261162e565b500390565b600082198211156117da576117da61162e565b500190565b634e487b7160e01b600052601260045260246000fd5b600082611804576118046117df565b500490565b6000806040838503121561181c57600080fd5b505080516020909101519092909150565b60008261183c5761183c6117df565b50069056fea2646970667358221220060b5711c99f20c8991f56d2e4c1b3fc60fe76c43ed8ed7b00f0a96ce84ba5c464736f6c634300080e0033";

export class CompoundInterestN__factory extends ContractFactory {
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
  ): Promise<CompoundInterestN> {
    return super.deploy(
      _analyticMath,
      overrides || {}
    ) as Promise<CompoundInterestN>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): CompoundInterestN {
    return super.attach(address) as CompoundInterestN;
  }
  connect(signer: Signer): CompoundInterestN__factory {
    return super.connect(signer) as CompoundInterestN__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CompoundInterestNInterface {
    return new utils.Interface(_abi) as CompoundInterestNInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CompoundInterestN {
    return new Contract(address, _abi, signerOrProvider) as CompoundInterestN;
  }
}