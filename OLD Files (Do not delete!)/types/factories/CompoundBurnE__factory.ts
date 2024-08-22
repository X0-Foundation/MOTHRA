/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CompoundBurnE, CompoundBurnEInterface } from "../CompoundBurnE";

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
  "0x60806040523480156200001157600080fd5b5060405162002215380380620022158339810160408190526200003491620007b7565b6200003f33620000fb565b600c80546001600160a01b0383166001600160a01b031991821617909155436004556009805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600a80548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600b80549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e160126008620007f8565b620000ee90600a6200091d565b6200014b565b5062000a18565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b81526004016200019891906200092e565b60405180910390fd5b50620001b082826001620001b4565b5050565b620001be6200037e565b6001600160a01b038316600090815260086020908152604080832054600754600284529184205490926200020492919064e8d4a510009062000a3b620004f3821b17901c565b62000210919062000986565b9050806006600082825462000226919062000986565b90915550506001600160a01b038416600090815260026020526040812080548392906200025590849062000986565b92505081905550806003600082825462000270919062000986565b90915550508115620002cd576001600160a01b03841660009081526002602052604081208054859290620002a6908490620009a0565b925050819055508260036000828254620002c19190620009a0565b90915550620003189050565b6001600160a01b03841660009081526002602052604081208054859290620002f790849062000986565b92505081905550826003600082825462000312919062000986565b90915550505b6200035c60075460026000876001600160a01b03166001600160a01b031681526020019081526020016000205464e8d4a51000620004f360201b62000a3b1760201c565b6001600160a01b03909416600090815260086020526040902093909355505050565b60006005546004544362000393919062000986565b6200039f919062000986565b90508015620004f057600c5460009081906001600160a01b0316635aff34dc620003cf610309620f424062000986565b6040516001600160e01b031960e084901b1681526004810191909152620f4240602482015260448101869052600a60648201526084016040805180830381865afa15801562000422573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620004489190620009bb565b915091506000620004686003548484620004f360201b62000a3b1760201c565b60035462000477919062000986565b905080600660008282546200048d9190620009a0565b92505081905550620004b164e8d4a510008484620004f360201b62000a3b1760201c565b620004c29064e8d4a5100062000986565b60076000828254620004d59190620009a0565b9091555050600454620004e9904362000986565b6005555050505b50565b600080620005038585856200053b565b905060006200051486868662000631565b11156200053157620005288160016200064f565b91505062000534565b90505b9392505050565b600080806200054b868662000666565b915091508160000362000575578381816200056a576200056a620009e0565b049250505062000534565b838210156200062c5760006200058d87878762000631565b90506000806200059f858585620006ba565b9150915081600003620005cc57868181620005be57620005be620009e0565b049550505050505062000534565b600087620005db8282620006f0565b1690506000620005ed848484620006fe565b905060006200060e838b81620006075762000607620009e0565b0462000755565b90506200061c82826200079a565b9850505050505050505062000534565b600080fd5b60008180620006445762000644620009e0565b838509949350505050565b60006200065d8284620009a0565b90505b92915050565b60008080620006768585620007a8565b905060006200068686866200079a565b90508082106200069e579081900392509050620006b3565b6001620006ac8383620006f0565b0393509150505b9250929050565b600080828410620006d25750839050818303620006e8565b6000198501620006e38585620006f0565b915091505b935093915050565b60006200065d828462000986565b6000806200072a83620007128382620006f0565b81620007225762000722620009e0565b506000919050565b90508284816200073e576200073e620009e0565b046200074b86836200079a565b1795945050505050565b60006001815b6008811015620007935762000788826200078260026200077c83896200079a565b620006f0565b6200079a565b91506001016200075b565b5092915050565b60006200065d8284620009f6565b60006000198284099392505050565b600060208284031215620007ca57600080fd5b81516001600160a01b03811681146200053457600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff03821115620008185762000818620007e2565b019392505050565b600181815b8085111562000861578160001904821115620008455762000845620007e2565b808516156200085357918102915b93841c939080029062000825565b509250929050565b6000826200087a5750600162000660565b81620008895750600062000660565b8160018114620008a25760028114620008ad57620008cd565b600191505062000660565b60ff841115620008c157620008c1620007e2565b50506001821b62000660565b5060208310610133831016604e8410600b8410161715620008f2575081810a62000660565b620008fe838362000820565b8060001904821115620009155762000915620007e2565b029392505050565b60006200065d60ff84168362000869565b600060208083528351808285015260005b818110156200095d578581018301518582016040015282016200093f565b8181111562000970576000604083870101525b50601f01601f1916929092016040019392505050565b6000828210156200099b576200099b620007e2565b500390565b60008219821115620009b657620009b6620007e2565b500190565b60008060408385031215620009cf57600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601260045260246000fd5b600081600019048311821515161562000a135762000a13620007e2565b500290565b6117ed8062000a286000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d1daefb411610071578063d1daefb4146103d0578063db1d0fd5146103d9578063dd62ed3e146103e1578063f2fde38b1461041a57600080fd5b8063a457c2d71461037a578063a9059cbb1461038d578063bdfeb1e5146103a057600080fd5b80638da5cb5b116100d35780638da5cb5b1461031857806395d89b41146103335780639dc29fac14610354578063a150da2a1461036757600080fd5b806370a08231146102f5578063715018a614610308578063739572891461031057600080fd5b806332cb6b0c11610166578063416ae76811610140578063416ae768146102a957806357627e93146102dc57806366666aa9146102e45780636863909e146102ed57600080fd5b806332cb6b0c14610279578063395093511461028157806340c10f191461029457600080fd5b806323b872dd116101a257806323b872dd1461023d5780632e0f2625146102505780632ff2e9dc1461026a578063313ce5671461027257600080fd5b806306fdde03146101c9578063095ea7b31461020457806318160ddd14610227575b600080fd5b60408051808201909152600d81526c436f6d706f756e644275726e4560981b60208201525b6040516101fb9190611485565b60405180910390f35b6102176102123660046114f6565b61042d565b60405190151581526020016101fb565b61022f610444565b6040519081526020016101fb565b61021761024b366004611520565b610453565b610258601281565b60405160ff90911681526020016101fb565b61022f6104f6565b6012610258565b61022f610510565b61021761028f3660046114f6565b610532565b6102a76102a23660046114f6565b61053f565b005b6102bc6102b736600461155c565b6105ee565b6040805194855260208501939093529183015260608201526080016101fb565b61022f601e81565b61022f60065481565b6102a761062f565b61022f61030336600461155c565b610775565b6102a7610780565b6102bc6107b6565b6000546040516001600160a01b0390911681526020016101fb565b6040805180820190915260058152644345424e4560d81b60208201526101ee565b6102a76103623660046114f6565b6108aa565b610217610375366004611520565b6108de565b6102176103883660046114f6565b61096a565b61021761039b3660046114f6565b610977565b6103a8610984565b604080519586526020860194909452928401919091526060830152608082015260a0016101fb565b61022f60075481565b61022f600c81565b61022f6103ef366004611577565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102a761042836600461155c565b6109a3565b600061043a338484610a79565b5060015b92915050565b600061044e610b3b565b905090565b60006001600160a01b03841633146104e0576001600160a01b0384166000908152600160209081526040808320338452909152902054828110156104de5760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b6104eb848484610b52565b5060015b9392505050565b610502601260086115c0565b61050d90600a6116c9565b81565b61051c601260086115c0565b61052790600a6116c9565b61050d90600a6116d8565b60006104ef338484610c5e565b6000546001600160a01b031633146105695760405162461bcd60e51b81526004016104d5906116f7565b610575601260086115c0565b61058090600a6116c9565b61058b90600a6116d8565b81610594610b3b565b61059e919061172c565b11156105e05760405162461bcd60e51b8152602060048201526011602482015270457863656564204d617820537570706c7960781b60448201526064016104d5565b6105ea8282610ce5565b5050565b6001600160a01b0381166000908152600260209081526040808320546008909252822060018101549054919290919061062685610d3c565b90509193509193565b6000600554600454436106429190611744565b61064c9190611744565b9050801561077257600c5460009081906001600160a01b0316635aff34dc610679610309620f4240611744565b6040516001600160e01b031960e084901b1681526004810191909152620f4240602482015260448101869052600a60648201526084016040805180830381865afa1580156106cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ef919061175b565b9150915060006107026003548484610a3b565b60035461070f9190611744565b90508060066000828254610723919061172c565b90915550610739905064e8d4a510008484610a3b565b6107489064e8d4a51000611744565b60076000828254610759919061172c565b909155505060045461076b9043611744565b6005555050505b50565b600061043e82610ea1565b6000546001600160a01b031633146107aa5760405162461bcd60e51b81526004016104d5906116f7565b6107b46000610ecf565b565b6000806000806107c4610f1f565b93506107e06107db6000546001600160a01b031690565b610d3c565b6107ea908461172c565b600954909350610802906001600160a01b0316610d3c565b61080c908461172c565b600a54909350610824906001600160a01b0316610d3c565b61082e908461172c565b600b54909350610846906001600160a01b0316610d3c565b610850908461172c565b9250600083851015610870576108668585611744565b9250839050610880565b61087a8486611744565b92508490505b80156108a357806108968464e8d4a510006116d8565b6108a09190611795565b91505b5090919293565b6000546001600160a01b031633146108d45760405162461bcd60e51b81526004016104d5906116f7565b6105ea8282611014565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b03851661092b5760405162461bcd60e51b81526004016104d59190611485565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104eb9085908590610965908690611744565b610a79565b60006104ef3384846108de565b600061043a338484610b52565b600354600554600754600654600061099a610f1f565b90509091929394565b6000546001600160a01b031633146109cd5760405162461bcd60e51b81526004016104d5906116f7565b6001600160a01b038116610a325760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104d5565b61077281610ecf565b600080610a498585856110c8565b90506000610a5886868661119e565b1115610a7157610a698160016111b9565b9150506104ef565b949350505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610ac35760405162461bcd60e51b81526004016104d59190611485565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610b0e5760405162461bcd60e51b81526004016104d59190611485565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b6000610b45610f1f565b60035461044e9190611744565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610b9c5760405162461bcd60e51b81526004016104d59190611485565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610be75760405162461bcd60e51b81526004016104d59190611485565b506000610bf384610ea1565b9050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610c3f5760405162461bcd60e51b81526004016104d59190611485565b50610c4c848360006111c5565b610c58838360016111c5565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610cab5760405162461bcd60e51b81526004016104d59190611485565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104eb908590859061096590869061172c565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610d2f5760405162461bcd60e51b81526004016104d59190611485565b506105ea828260016111c5565b6001600160a01b0381166000908152600860209081526040808320546007546002909352908320548392610d759164e8d4a51000610a3b565b610d7f9190611744565b9050600060055460045443610d949190611744565b610d9e9190611744565b600c5490915060009081906001600160a01b0316635aff34dc610dc6610309620f4240611744565b6040516001600160e01b031960e084901b1681526004810191909152620f4240602482015260448101869052600a60648201526084016040805180830381865afa158015610e18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3c919061175b565b6001600160a01b03881660009081526002602052604081205492945090925090610e67908484610a3b565b6001600160a01b038816600090815260026020526040902054610e8a9190611744565b9050610e96818661172c565b979650505050505050565b6000610eac82610d3c565b6001600160a01b03831660009081526002602052604090205461043e9190611744565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008060055460045443610f339190611744565b610f3d9190611744565b600c5490915060009081906001600160a01b0316635aff34dc610f65610309620f4240611744565b6040516001600160e01b031960e084901b1681526004810191909152620f4240602482015260448101869052600a60648201526084016040805180830381865afa158015610fb7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdb919061175b565b915091506000610fee6003548484610a3b565b600354610ffb9190611744565b90508060065461100b919061172c565b94505050505090565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b03831661105e5760405162461bcd60e51b81526004016104d59190611485565b50600061106a83610ea1565b9050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b815250906110b65760405162461bcd60e51b81526004016104d59190611485565b506110c3838360006111c5565b505050565b60008060006110d78686611356565b91509150816000036110fc578381816110f2576110f261177f565b04925050506104ef565b838210156101c457600061111187878761119e565b90506000806111218585856113a3565b91509150816000036111495786818161113c5761113c61177f565b04955050505050506104ef565b60008761115760008a6113d4565b16905060006111678484846113e0565b90506000611183838b8161117d5761117d61177f565b0461142d565b905061118f828261146a565b985050505050505050506104ef565b600081806111ae576111ae61177f565b838509949350505050565b60006104ef828461172c565b6111cd61062f565b6001600160a01b03831660009081526008602090815260408083205460075460029093529083205490916112069164e8d4a51000610a3b565b6112109190611744565b905080600660008282546112249190611744565b90915550506001600160a01b03841660009081526002602052604081208054839290611251908490611744565b92505081905550806003600082825461126a9190611744565b909155505081156112c1576001600160a01b0384166000908152600260205260408120805485929061129d90849061172c565b9250508190555082600360008282546112b6919061172c565b909155506113089050565b6001600160a01b038416600090815260026020526040812080548592906112e9908490611744565b9250508190555082600360008282546113029190611744565b90915550505b6007546001600160a01b038516600090815260026020526040902054611334919064e8d4a51000610a3b565b6001600160a01b03909416600090815260086020526040902093909355505050565b60008060006113658585611476565b90506000611373868661146a565b905080821061138957908190039250905061139c565b600161139583836113d4565b0393509150505b9250929050565b6000808284106113b957508390508183036113cc565b600185036113c785856113d4565b915091505b935093915050565b60006104ef8284611744565b600080611407836113f26000866113d4565b816113ff576113ff61177f565b506000919050565b90508284816114185761141861177f565b04611423868361146a565b1795945050505050565b60006001815b60088110156114635761145982611454600261144f868961146a565b6113d4565b61146a565b9150600101611433565b5092915050565b60006104ef82846116d8565b60006000198284099392505050565b600060208083528351808285015260005b818110156114b257858101830151858201604001528201611496565b818111156114c4576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146114f157600080fd5b919050565b6000806040838503121561150957600080fd5b611512836114da565b946020939093013593505050565b60008060006060848603121561153557600080fd5b61153e846114da565b925061154c602085016114da565b9150604084013590509250925092565b60006020828403121561156e57600080fd5b6104ef826114da565b6000806040838503121561158a57600080fd5b611593836114da565b91506115a1602084016114da565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156115dd576115dd6115aa565b019392505050565b600181815b80851115611620578160001904821115611606576116066115aa565b8085161561161357918102915b93841c93908002906115ea565b509250929050565b6000826116375750600161043e565b816116445750600061043e565b816001811461165a576002811461166457611680565b600191505061043e565b60ff841115611675576116756115aa565b50506001821b61043e565b5060208310610133831016604e8410600b84101617156116a3575081810a61043e565b6116ad83836115e5565b80600019048211156116c1576116c16115aa565b029392505050565b60006104ef60ff841683611628565b60008160001904831182151516156116f2576116f26115aa565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561173f5761173f6115aa565b500190565b600082821015611756576117566115aa565b500390565b6000806040838503121561176e57600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601260045260246000fd5b6000826117b257634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212209f38ef3155e5fea0c16b67ed5d2c1b0298b5708ca2dfd55cdf34b21e0a36b6f364736f6c634300080e0033";

export class CompoundBurnE__factory extends ContractFactory {
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
  ): Promise<CompoundBurnE> {
    return super.deploy(
      _analyticMath,
      overrides || {}
    ) as Promise<CompoundBurnE>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): CompoundBurnE {
    return super.attach(address) as CompoundBurnE;
  }
  connect(signer: Signer): CompoundBurnE__factory {
    return super.connect(signer) as CompoundBurnE__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CompoundBurnEInterface {
    return new utils.Interface(_abi) as CompoundBurnEInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CompoundBurnE {
    return new Contract(address, _abi, signerOrProvider) as CompoundBurnE;
  }
}