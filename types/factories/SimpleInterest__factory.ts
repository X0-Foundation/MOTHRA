/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SimpleInterest,
  SimpleInterestInterface,
} from "../SimpleInterest";

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
  "0x60806040523480156200001157600080fd5b50604051620021f0380380620021f0833981016040819052620000349162000788565b6200003f33620000fb565b600c80546001600160a01b0383166001600160a01b031991821617909155436004556009805482167370997970c51812dc3a010c7d01b50e0d17dc79c8179055600a80548216733c44cdddb6a900fa2b585dd299e03d12fa4293bc179055600b80549091167390f79bf6eb2c4f870365e785982e1f101e93b906179055620000f4620000d36000546001600160a01b031690565b620000e160126008620007c9565b620000ee90600a620008ee565b6200014b565b5062000a0c565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316620001a15760405162461bcd60e51b8152600401620001989190620008ff565b60405180910390fd5b50620001b082826001620001b4565b5050565b620001be6200035b565b6001600160a01b038316600090815260086020908152604080832054600290925282205460075464e8d4a5100091620001f79162000957565b6200020391906200098f565b6200020f9190620009b2565b90508060066000828254620002259190620009b2565b90915550506001600160a01b0384166000908152600860205260408120600101805483929062000257908490620009cc565b90915550508115620002b4576001600160a01b038416600090815260026020526040812080548592906200028d908490620009cc565b925050819055508260036000828254620002a89190620009cc565b90915550620002ff9050565b6001600160a01b03841660009081526002602052604081208054859290620002de908490620009b2565b925050819055508260036000828254620002f99190620009b2565b90915550505b6001600160a01b03841660009081526002602052604090205460075464e8d4a51000916200032d9162000957565b6200033991906200098f565b6001600160a01b03909416600090815260086020526040902093909355505050565b6000600454436200036d9190620009b2565b9050600060055482620003819190620009b2565b90508015620001b057600c5460009081906001600160a01b0316635aff34dc620003b1610309620186a0620009cc565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa15801562000404573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200042a9190620009e7565b9150915060006003546200044d6003548585620004c460201b62000a601760201c565b620004599190620009b2565b905080600660008282546200046f9190620009cc565b9091555064e8d4a5100090508262000488858362000957565b6200049491906200098f565b620004a09190620009b2565b60076000828254620004b39190620009cc565b909155505050600584905550505050565b600080620004d48585856200050c565b90506000620004e586868662000602565b11156200050257620004f981600162000620565b91505062000505565b90505b9392505050565b600080806200051c868662000637565b915091508160000362000546578381816200053b576200053b62000979565b049250505062000505565b83821015620005fd5760006200055e87878762000602565b9050600080620005708585856200068b565b91509150816000036200059d578681816200058f576200058f62000979565b049550505050505062000505565b600087620005ac8282620006c1565b1690506000620005be848484620006cf565b90506000620005df838b81620005d857620005d862000979565b0462000726565b9050620005ed82826200076b565b9850505050505050505062000505565b600080fd5b6000818062000615576200061562000979565b838509949350505050565b60006200062e8284620009cc565b90505b92915050565b6000808062000647858562000779565b905060006200065786866200076b565b90508082106200066f57908190039250905062000684565b60016200067d8383620006c1565b0393509150505b9250929050565b600080828410620006a35750839050818303620006b9565b6000198501620006b48585620006c1565b915091505b935093915050565b60006200062e8284620009b2565b600080620006fb83620006e38382620006c1565b81620006f357620006f362000979565b506000919050565b90508284816200070f576200070f62000979565b046200071c86836200076b565b1795945050505050565b60006001815b6008811015620007645762000759826200075360026200074d83896200076b565b620006c1565b6200076b565b91506001016200072c565b5092915050565b60006200062e828462000957565b60006000198284099392505050565b6000602082840312156200079b57600080fd5b81516001600160a01b03811681146200050557600080fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff03821115620007e957620007e9620007b3565b019392505050565b600181815b8085111562000832578160001904821115620008165762000816620007b3565b808516156200082457918102915b93841c9390800290620007f6565b509250929050565b6000826200084b5750600162000631565b816200085a5750600062000631565b81600181146200087357600281146200087e576200089e565b600191505062000631565b60ff841115620008925762000892620007b3565b50506001821b62000631565b5060208310610133831016604e8410600b8410161715620008c3575081810a62000631565b620008cf8383620007f1565b8060001904821115620008e657620008e6620007b3565b029392505050565b60006200062e60ff8416836200083a565b600060208083528351808285015260005b818110156200092e5785810183015185820160400152820162000910565b8181111562000941576000604083870101525b50601f01601f1916929092016040019392505050565b6000816000190483118215151615620009745762000974620007b3565b500290565b634e487b7160e01b600052601260045260246000fd5b600082620009ad57634e487b7160e01b600052601260045260246000fd5b500490565b600082821015620009c757620009c7620007b3565b500390565b60008219821115620009e257620009e2620007b3565b500190565b60008060408385031215620009fb57600080fd5b505080516020909101519092909150565b6117d48062000a1c6000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d1daefb411610071578063d1daefb4146103d0578063db1d0fd5146103d9578063dd62ed3e146103e1578063f2fde38b1461041a57600080fd5b8063a457c2d71461037a578063a9059cbb1461038d578063bdfeb1e5146103a057600080fd5b80638da5cb5b116100d35780638da5cb5b1461031957806395d89b41146103345780639dc29fac14610354578063a150da2a1461036757600080fd5b806370a08231146102f6578063715018a614610309578063739572891461031157600080fd5b806332cb6b0c11610166578063416ae76811610140578063416ae768146102aa57806357627e93146102dd57806366666aa9146102e55780636863909e146102ee57600080fd5b806332cb6b0c1461027a578063395093511461028257806340c10f191461029557600080fd5b806323b872dd116101a257806323b872dd1461023e5780632e0f2625146102515780632ff2e9dc1461026b578063313ce5671461027357600080fd5b806306fdde03146101c9578063095ea7b31461020557806318160ddd14610228575b600080fd5b60408051808201909152600e81526d14da5b5c1b19525b9d195c995cdd60921b60208201525b6040516101fc919061146c565b60405180910390f35b6102186102133660046114dd565b61042d565b60405190151581526020016101fc565b610230610444565b6040519081526020016101fc565b61021861024c366004611507565b610454565b610259601281565b60405160ff90911681526020016101fc565b6102306104f7565b6012610259565b610230610511565b6102186102903660046114dd565b610533565b6102a86102a33660046114dd565b610540565b005b6102bd6102b8366004611543565b6105f0565b6040805194855260208501939093529183015260608201526080016101fc565b610230601e81565b61023060065481565b6102a8610631565b610230610304366004611543565b610777565b6102a8610795565b6102bd6107cb565b6000546040516001600160a01b0390911681526020016101fc565b6040805180820190915260048152635345525760e01b60208201526101ef565b6102a86103623660046114dd565b6108cc565b610218610375366004611507565b610900565b6102186103883660046114dd565b61098c565b61021861039b3660046114dd565b610999565b6103a86109a6565b604080519586526020860194909452928401919091526060830152608082015260a0016101fc565b61023060075481565b610230600c81565b6102306103ef36600461155e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102a8610428366004611543565b6109c5565b600061043a338484610a9e565b5060015b92915050565b600061044f60035490565b905090565b60006001600160a01b03841633146104e1576001600160a01b0384166000908152600160209081526040808320338452909152902054828110156104df5760405162461bcd60e51b815260206004820152601a60248201527f5472616e73666572206578636565647320616c6c6f77616e636500000000000060448201526064015b60405180910390fd5b505b6104ec848484610b60565b5060015b9392505050565b610503601260086115a7565b61050e90600a6116b0565b81565b61051d601260086115a7565b61052890600a6116b0565b61050e90600a6116bf565b60006104f0338484610c7a565b6000546001600160a01b0316331461056a5760405162461bcd60e51b81526004016104d6906116de565b610576601260086115a7565b61058190600a6116b0565b61058c90600a6116bf565b8161059660035490565b6105a09190611713565b11156105e25760405162461bcd60e51b8152602060048201526011602482015270457863656564204d617820537570706c7960781b60448201526064016104d6565b6105ec8282610d01565b5050565b6001600160a01b0381166000908152600260209081526040808320546008909252822060018101549054919290919061062885610d58565b90509193509193565b600060045443610641919061172b565b9050600060055482610653919061172b565b905080156105ec57600c5460009081906001600160a01b0316635aff34dc610680610309620186a0611713565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa1580156106d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f69190611742565b91509150600060035461070c6003548585610a60565b610716919061172b565b9050806006600082825461072a9190611713565b9091555064e8d4a5100090508261074185836116bf565b61074b919061177c565b610755919061172b565b600760008282546107669190611713565b909155505050600584905550505050565b6001600160a01b03811660009081526002602052604081205461043e565b6000546001600160a01b031633146107bf5760405162461bcd60e51b81526004016104d6906116de565b6107c96000610eb6565b565b6000806000806006546107dc610f06565b6107e69190611713565b93506108026107fd6000546001600160a01b031690565b610d58565b61080c9084611713565b600954909350610824906001600160a01b0316610d58565b61082e9084611713565b600a54909350610846906001600160a01b0316610d58565b6108509084611713565b600b54909350610868906001600160a01b0316610d58565b6108729084611713565b925060008385101561089257610888858561172b565b92508390506108a2565b61089c848661172b565b92508490505b80156108c557806108b88464e8d4a510006116bf565b6108c2919061177c565b91505b5090919293565b6000546001600160a01b031633146108f65760405162461bcd60e51b81526004016104d6906116de565b6105ec8282610ff1565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b03851661094d5760405162461bcd60e51b81526004016104d6919061146c565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104ec908590859061098790869061172b565b610a9e565b60006104f0338484610900565b600061043a338484610b60565b60035460055460075460065460006109bc610f06565b90509091929394565b6000546001600160a01b031633146109ef5760405162461bcd60e51b81526004016104d6906116de565b6001600160a01b038116610a545760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104d6565b610a5d81610eb6565b50565b600080610a6e8585856110b3565b90506000610a7d868686611189565b1115610a9657610a8e8160016111a4565b9150506104f0565b949350505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610ae85760405162461bcd60e51b81526004016104d6919061146c565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610b335760405162461bcd60e51b81526004016104d6919061146c565b506001600160a01b0392831660009081526001602090815260408083209490951682529290925291902055565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038416610baa5760405162461bcd60e51b81526004016104d6919061146c565b5060408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610bf55760405162461bcd60e51b81526004016104d6919061146c565b506001600160a01b0383166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b81525090610c5b5760405162461bcd60e51b81526004016104d6919061146c565b50610c68848360006111b0565b610c74838360016111b0565b50505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526000906001600160a01b038516610cc75760405162461bcd60e51b81526004016104d6919061146c565b506001600160a01b038085166000908152600160209081526040808320938716835292905220546104ec9085908590610987908690611713565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b038316610d4b5760405162461bcd60e51b81526004016104d6919061146c565b506105ec828260016111b0565b6001600160a01b038116600090815260086020908152604080832054600290925282205460075483929164e8d4a5100091610d9391906116bf565b610d9d919061177c565b610da7919061172b565b9050600060045443610db9919061172b565b9050600060055482610dcb919061172b565b600c5490915060009081906001600160a01b0316635aff34dc610df3610309620186a0611713565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610e45573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e699190611742565b6001600160a01b03891660009081526002602052604081205492945090925090610e948185856110b3565b610e9e919061172b565b9050610eaa8187611713565b98975050505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008060045443610f17919061172b565b9050600060055482610f29919061172b565b600c5490915060009081906001600160a01b0316635aff34dc610f51610309620186a0611713565b6040516001600160e01b031960e084901b1681526004810191909152620186a0602482015260448101869052600a60648201526084016040805180830381865afa158015610fa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc79190611742565b915091506000600354610fdd6003548585610a60565b610fe7919061172b565b9695505050505050565b60408051808201909152600c81526b5a65726f206164647265737360a01b60208201526001600160a01b03831661103b5760405162461bcd60e51b81526004016104d6919061146c565b506001600160a01b0382166000908152600260205260408120549050818110156040518060400160405280600f81526020016e457863656564732062616c616e636560881b815250906110a15760405162461bcd60e51b81526004016104d6919061146c565b506110ae838360006111b0565b505050565b60008060006110c2868661133d565b91509150816000036110e7578381816110dd576110dd611766565b04925050506104f0565b838210156101c45760006110fc878787611189565b905060008061110c85858561138a565b91509150816000036111345786818161112757611127611766565b04955050505050506104f0565b60008761114260008a6113bb565b16905060006111528484846113c7565b9050600061116e838b8161116857611168611766565b04611414565b905061117a8282611451565b985050505050505050506104f0565b6000818061119957611199611766565b838509949350505050565b60006104f08284611713565b6111b8610631565b6001600160a01b038316600090815260086020908152604080832054600290925282205460075464e8d4a51000916111ef916116bf565b6111f9919061177c565b611203919061172b565b90508060066000828254611217919061172b565b90915550506001600160a01b03841660009081526008602052604081206001018054839290611247908490611713565b9091555050811561129e576001600160a01b0384166000908152600260205260408120805485929061127a908490611713565b9250508190555082600360008282546112939190611713565b909155506112e59050565b6001600160a01b038416600090815260026020526040812080548592906112c690849061172b565b9250508190555082600360008282546112df919061172b565b90915550505b6001600160a01b03841660009081526002602052604090205460075464e8d4a5100091611311916116bf565b61131b919061177c565b6001600160a01b03909416600090815260086020526040902093909355505050565b600080600061134c858561145d565b9050600061135a8686611451565b9050808210611370579081900392509050611383565b600161137c83836113bb565b0393509150505b9250929050565b6000808284106113a057508390508183036113b3565b600185036113ae85856113bb565b915091505b935093915050565b60006104f0828461172b565b6000806113ee836113d96000866113bb565b816113e6576113e6611766565b506000919050565b90508284816113ff576113ff611766565b0461140a8683611451565b1795945050505050565b60006001815b600881101561144a576114408261143b60026114368689611451565b6113bb565b611451565b915060010161141a565b5092915050565b60006104f082846116bf565b60006000198284099392505050565b600060208083528351808285015260005b818110156114995785810183015185820160400152820161147d565b818111156114ab576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146114d857600080fd5b919050565b600080604083850312156114f057600080fd5b6114f9836114c1565b946020939093013593505050565b60008060006060848603121561151c57600080fd5b611525846114c1565b9250611533602085016114c1565b9150604084013590509250925092565b60006020828403121561155557600080fd5b6104f0826114c1565b6000806040838503121561157157600080fd5b61157a836114c1565b9150611588602084016114c1565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff84168060ff038211156115c4576115c4611591565b019392505050565b600181815b808511156116075781600019048211156115ed576115ed611591565b808516156115fa57918102915b93841c93908002906115d1565b509250929050565b60008261161e5750600161043e565b8161162b5750600061043e565b8160018114611641576002811461164b57611667565b600191505061043e565b60ff84111561165c5761165c611591565b50506001821b61043e565b5060208310610133831016604e8410600b841016171561168a575081810a61043e565b61169483836115cc565b80600019048211156116a8576116a8611591565b029392505050565b60006104f060ff84168361160f565b60008160001904831182151516156116d9576116d9611591565b500290565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561172657611726611591565b500190565b60008282101561173d5761173d611591565b500390565b6000806040838503121561175557600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601260045260246000fd5b60008261179957634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212200e64c4b5d9abd9dfb7a47bb9010fe8a14372e6203fc73e4754b6d0b34d2f03be64736f6c634300080e0033";

export class SimpleInterest__factory extends ContractFactory {
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
  ): Promise<SimpleInterest> {
    return super.deploy(
      _analyticMath,
      overrides || {}
    ) as Promise<SimpleInterest>;
  }
  getDeployTransaction(
    _analyticMath: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_analyticMath, overrides || {});
  }
  attach(address: string): SimpleInterest {
    return super.attach(address) as SimpleInterest;
  }
  connect(signer: Signer): SimpleInterest__factory {
    return super.connect(signer) as SimpleInterest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleInterestInterface {
    return new utils.Interface(_abi) as SimpleInterestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleInterest {
    return new Contract(address, _abi, signerOrProvider) as SimpleInterest;
  }
}
