/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UniV3PairManager,
  UniV3PairManagerInterface,
} from "../UniV3PairManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ExcessiveSlippage",
    type: "error",
  },
  {
    inputs: [],
    name: "NoGovernanceZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyGovernance",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyPendingGovernance",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyPool",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsuccessfulTransfer",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_pendingGovernance",
        type: "address",
      },
    ],
    name: "GovernanceProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    name: "GovernanceSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
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
        name: "",
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
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "amount0Min",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Min",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collect",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "factory",
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
    name: "fee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "governance",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Desired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Desired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount0Min",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Min",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
    ],
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
    name: "pendingGovernance",
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
    name: "pool",
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
    name: "position",
    outputs: [
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "feeGrowthInside0LastX128",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeGrowthInside1LastX128",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "tokensOwed0",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "tokensOwed1",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sqrtRatioAX96",
    outputs: [
      {
        internalType: "uint160",
        name: "",
        type: "uint160",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sqrtRatioBX96",
    outputs: [
      {
        internalType: "uint160",
        name: "",
        type: "uint160",
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
    name: "tickLower",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tickSpacing",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tickUpper",
    outputs: [
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
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
    name: "token1",
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
        name: "to",
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
        name: "from",
        type: "address",
      },
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
        internalType: "uint256",
        name: "amount0Owed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Owed",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "uniswapV3MintCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101c06040523480156200001257600080fd5b50604051620030db380380620030db833981016040819052620000359162000a7c565b806001600160a01b0381166200005d5760405162b293ed60e81b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b039283161781556040805163ddca3f4360e01b81529051919285169163ddca3f43916004808201926020929091908290030181865afa158015620000ba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000e0919062000ab4565b90506000836001600160a01b0316630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000123573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000149919062000ae2565b90506000846001600160a01b031663d21220a76040518163ffffffff1660e01b8152600401602060405180830381865afa1580156200018c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001b2919062000ae2565b90506000856001600160a01b031663d0c93a7c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015620001f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200021b919062000b00565b905060006200022e82620d89e862000b3b565b6200023d90620d89e862000b76565b905060006200024c8262000bc4565b336080526001600160a01b0389811660e05262ffffff881661010052600285810b6101a05284810b6101805282900b6101605286811660a081905290861660c052604080516395d89b4160e01b8152905192935090916395d89b41916004808201926000929091908290030181865afa158015620002ce573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052620002f8919081019062000c32565b846001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa15801562000337573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405262000361919081019062000c32565b6040516020016200037492919062000cea565b604051602081830303815290604052600290805190602001906200039a929190620009b9565b50846001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015620003da573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405262000404919081019062000c32565b846001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa15801562000443573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526200046d919081019062000c32565b6040516020016200048092919062000d41565b60405160208183030381529060405260039080519060200190620004a6929190620009b9565b50620004bd816200055460201b62000ee21760201c565b6001600160a01b031661012052620004e18262000554602090811b62000ee217901c565b6001600160a01b039081166101405260408051606081018252968216808852959091166020870181905262ffffff9790971695018590525050600780546001600160a01b03191690921790915550600880546001600160b81b031916909217600160a01b9091021790555062000e579050565b60008060008360020b126200056d578260020b6200057c565b8260020b6200057c9062000d91565b90506200058d620d89e71962000bc4565b60020b811115620005c85760405162461bcd60e51b81526020600482015260016024820152601560fa1b604482015260640160405180910390fd5b600081600116600003620005e157600160801b620005f3565b6ffffcb933bd6fad37aa2d162d1a5940015b6001600160881b0316905060028216156200062b57608062000626826ffff97272373d413259a46990580e213a62000db0565b901c90505b60048216156200065857608062000653826ffff2e50f5f656932ef12357cf3c7fdcc62000db0565b901c90505b60088216156200068557608062000680826fffe5caca7e10e4e61c3624eaa0941cd062000db0565b901c90505b6010821615620006b2576080620006ad826fffcb9843d60f6159c9db58835c92664462000db0565b901c90505b6020821615620006df576080620006da826fff973b41fa98c081472e6896dfb254c062000db0565b901c90505b60408216156200070c57608062000707826fff2ea16466c96a3843ec78b326b5286162000db0565b901c90505b60808216156200073957608062000734826ffe5dee046a99a2a811c461f1969c305362000db0565b901c90505b6101008216156200076757608062000762826ffcbe86c7900a88aedcffc83b479aa3a462000db0565b901c90505b6102008216156200079557608062000790826ff987a7253ac413176f2b074cf7815e5462000db0565b901c90505b610400821615620007c3576080620007be826ff3392b0822b70005940c7a398e4b70f362000db0565b901c90505b610800821615620007f1576080620007ec826fe7159475a2c29b7443b29c7fa6e889d962000db0565b901c90505b6110008216156200081f5760806200081a826fd097f3bdfd2022b8845ad8f792aa582562000db0565b901c90505b6120008216156200084d57608062000848826fa9f746462d870fdf8a65dc1f90e061e562000db0565b901c90505b6140008216156200087b57608062000876826f70d869a156d2a1b890bb3df62baf32f762000db0565b901c90505b618000821615620008a9576080620008a4826f31be135f97d08fd981231505542fcfa662000db0565b901c90505b62010000821615620008d8576080620008d3826f09aa508b5b7a84e1c677de54f3e99bc962000db0565b901c90505b620200008216156200090657608062000901826e5d6af8dedb81196699c329225ee60462000db0565b901c90505b62040000821615620009335760806200092e826d2216e584f5fa1ea926041bedfe9862000db0565b901c90505b620800008216156200095e57608062000959826b048a170391f7dc42444e8fa262000db0565b901c90505b60008460020b13156200097c57620009798160001962000dd2565b90505b6200098d6401000000008262000de9565b156200099b5760016200099e565b60005b620009b19060ff16602083901c62000e00565b949350505050565b828054620009c79062000e1b565b90600052602060002090601f016020900481019282620009eb576000855562000a36565b82601f1062000a0657805160ff191683800117855562000a36565b8280016001018555821562000a36579182015b8281111562000a3657825182559160200191906001019062000a19565b5062000a4492915062000a48565b5090565b5b8082111562000a44576000815560010162000a49565b80516001600160a01b038116811462000a7757600080fd5b919050565b6000806040838503121562000a9057600080fd5b62000a9b8362000a5f565b915062000aab6020840162000a5f565b90509250929050565b60006020828403121562000ac757600080fd5b815162ffffff8116811462000adb57600080fd5b9392505050565b60006020828403121562000af557600080fd5b62000adb8262000a5f565b60006020828403121562000b1357600080fd5b81518060020b811462000adb57600080fd5b634e487b7160e01b600052601260045260246000fd5b60008260020b8062000b515762000b5162000b25565b808360020b0791505092915050565b634e487b7160e01b600052601160045260246000fd5b60008160020b8360020b6000811281627fffff190183128115161562000ba05762000ba062000b60565b81627fffff01831381161562000bba5762000bba62000b60565b5090039392505050565b60008160020b627fffff19810362000be05762000be062000b60565b60000392915050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101562000c1c57818101518382015260200162000c02565b8381111562000c2c576000848401525b50505050565b60006020828403121562000c4557600080fd5b81516001600160401b038082111562000c5d57600080fd5b818401915084601f83011262000c7257600080fd5b81518181111562000c875762000c8762000be9565b604051601f8201601f19908116603f0116810190838211818310171562000cb25762000cb262000be9565b8160405282815287602084870101111562000ccc57600080fd5b62000cdf83602083016020880162000bff565b979650505050505050565b6a025b2b2b819b926281016960ad1b81526000835162000d1281600b85016020880162000bff565b602f60f81b600b91840191820152835162000d3581600c84016020880162000bff565b01600c01949350505050565b636b4c502d60e01b81526000835162000d6281600485016020880162000bff565b602f60f81b600491840191820152835162000d8581600584016020880162000bff565b01600501949350505050565b6000600160ff1b820162000da95762000da962000b60565b5060000390565b600081600019048311821515161562000dcd5762000dcd62000b60565b500290565b60008262000de45762000de462000b25565b500490565b60008262000dfb5762000dfb62000b25565b500690565b6000821982111562000e165762000e1662000b60565b500190565b600181811c9082168062000e3057607f821691505b60208210810362000e5157634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a05160c05160e05161010051610120516101405161016051610180516101a05161216062000f7b600039600061048b0152600081816103280152818161063e015281816109f301528181610b3b01528181610d1501528181610e5e015261157501526000818161036201528181610613015281816109c801528181610b1901528181610cea01528181610e3c015261155301526000818161043c015261146b0152600081816102e7015261144a0152600061051701526000818161028c0152818161067901528181610a3701528181610aea01528181610be201528181610c3501528181610c7301528181610d4a01528181610e09015281816113bc0152611522015260006104b20152600061024d0152600061041501526121606000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806395d89b41116100f9578063d0c93a7c11610097578063dd62ed3e11610071578063dd62ed3e146104e7578063ddca3f4314610512578063e52253811461054d578063f39c38a01461055557600080fd5b8063d0c93a7c14610486578063d21220a7146104ad578063d3487997146104d457600080fd5b8063ab033ea9116100d3578063ab033ea9146103fd578063c45a015514610410578063c627526114610437578063cf51148d1461045e57600080fd5b806395d89b41146103b7578063a3e6dc28146103bf578063a9059cbb146103ea57600080fd5b806323b872dd1161016657806355b812a81161014057806355b812a81461032357806359c4f9051461035d5780635aa6e6751461038457806370a082311461039757600080fd5b806323b872dd146102cf5780632ea28f5b146102e2578063313ce5671461030957600080fd5b80630dfe1681116101a25780630dfe16811461024857806316f0115b1461028757806318160ddd146102ae578063238efcbc146102c557600080fd5b806306fdde03146101c957806309218e91146101e7578063095ea7b314610225575b600080fd5b6101d1610568565b6040516101de9190611ab8565b60405180910390f35b6101ef6105f6565b604080516001600160801b039687168152602081019590955284019290925283166060830152909116608082015260a0016101de565b610238610233366004611ae3565b610729565b60405190151581526020016101de565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020016101de565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b6102b760045481565b6040519081526020016101de565b6102cd610795565b005b6102386102dd366004611b0f565b61081e565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b610311601281565b60405160ff90911681526020016101de565b61034a7f000000000000000000000000000000000000000000000000000000000000000081565b60405160029190910b81526020016101de565b61034a7f000000000000000000000000000000000000000000000000000000000000000081565b60005461026f906001600160a01b031681565b6102b76103a5366004611b50565b60066020526000908152604090205481565b6101d16108e7565b6103d26103cd366004611b6d565b6108f4565b6040516001600160801b0390911681526020016101de565b6102386103f8366004611ae3565b610924565b6102cd61040b366004611b50565b61093a565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b61047161046c366004611bcf565b6109b9565b604080519283526020830191909152016101de565b61034a7f000000000000000000000000000000000000000000000000000000000000000081565b61026f7f000000000000000000000000000000000000000000000000000000000000000081565b6102cd6104e2366004611c19565b610bc7565b6102b76104f5366004611c99565b600560209081526000928352604080842090915290825290205481565b6105397f000000000000000000000000000000000000000000000000000000000000000081565b60405162ffffff90911681526020016101de565b610471610c9f565b60015461026f906001600160a01b031681565b6002805461057590611cd2565b80601f01602080910402602001604051908101604052809291908181526020018280546105a190611cd2565b80156105ee5780601f106105c3576101008083540402835291602001916105ee565b820191906000526020600020905b8154815290600101906020018083116105d157829003601f168201915b505050505081565b6040516bffffffffffffffffffffffff193060601b1660208201527f000000000000000000000000000000000000000000000000000000000000000060e890811b60348301527f0000000000000000000000000000000000000000000000000000000000000000901b603782015260009081908190819081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063514ea4bf90603a01604051602081830303815290604052805190602001206040518263ffffffff1660e01b81526004016106d791815260200190565b60a060405180830381865afa1580156106f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107189190611d0c565b939992985090965094509092509050565b3360008181526005602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906107849086815260200190565b60405180910390a350600192915050565b6001546001600160a01b031633146107c057604051637ef5703160e11b815260040160405180910390fd5b60018054600080546001600160a01b0383166001600160a01b031991821681179092559091169091556040519081527fc73be659241aade67e9a059bcf21494955018b213dbd1179054ccf928b13f3b69060200160405180910390a1565b6001600160a01b03831660008181526005602090815260408083203380855292528220549192909190821480159061085857506000198114155b156108ce5760006108698583611d76565b6001600160a01b038881166000818152600560209081526040808320948916808452948252918290208590559051848152939450919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505b6108d9868686611306565b6001925050505b9392505050565b6003805461057590611cd2565b6000610902868686866113b4565b5090915061091b9050826001600160801b03831661161d565b95945050505050565b6000610931338484611306565b50600192915050565b6000546001600160a01b03163314610965576040516354348f0360e01b815260040160405180910390fd5b600180546001600160a01b0319166001600160a01b0383169081179091556040519081527fe987aaedf9d279143bdf1eee16cf1d0feb47742867d81083df8d6cd0a5ac857f9060200160405180910390a150565b60405163a34123a760e01b81527f0000000000000000000000000000000000000000000000000000000000000000600290810b60048301527f0000000000000000000000000000000000000000000000000000000000000000900b60248201526001600160801b038516604482015260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063a34123a79060640160408051808303816000875af1158015610a7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa39190611d8d565b909250905084821080610ab557508381105b15610ad3576040516397c7f53760e01b815260040160405180910390fd5b6040516309e3d67b60e31b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690634f1eb3d890610b679086907f0000000000000000000000000000000000000000000000000000000000000000907f00000000000000000000000000000000000000000000000000000000000000009088908890600401611db1565b60408051808303816000875af1158015610b85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba99190611dee565b5050610bbe33876001600160801b03166116a7565b94509492505050565b6000610bd582840184611e54565b9050336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610c2057604051634b60273560e01b815260040160405180910390fd5b8415610c5a578051516020820151610c5a91907f000000000000000000000000000000000000000000000000000000000000000088611729565b8315610c9857610c9881600001516020015182602001517f000000000000000000000000000000000000000000000000000000000000000087611729565b5050505050565b6000805481906001600160a01b03163314610ccd576040516354348f0360e01b815260040160405180910390fd5b6040516bffffffffffffffffffffffff193060601b1660208201527f000000000000000000000000000000000000000000000000000000000000000060e890811b60348301527f0000000000000000000000000000000000000000000000000000000000000000901b603782015260009081906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063514ea4bf90603a01604051602081830303815290604052805190602001206040518263ffffffff1660e01b8152600401610da891815260200190565b60a060405180830381865afa158015610dc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de99190611d0c565b6000546040516309e3d67b60e31b81529297509095506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169550634f1eb3d89450610e8a935016907f0000000000000000000000000000000000000000000000000000000000000000907f00000000000000000000000000000000000000000000000000000000000000009088908890600401611db1565b60408051808303816000875af1158015610ea8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ecc9190611dee565b6001600160801b03918216969116945092505050565b60008060008360020b12610ef9578260020b610f06565b8260020b610f0690611f0f565b9050610f15620d89e719611f2b565b60020b811115610f4f5760405162461bcd60e51b81526020600482015260016024820152601560fa1b604482015260640160405180910390fd5b600081600116600003610f6657600160801b610f78565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff1690506002821615610fb7576080610fb2826ffff97272373d413259a46990580e213a611f4d565b901c90505b6004821615610fe1576080610fdc826ffff2e50f5f656932ef12357cf3c7fdcc611f4d565b901c90505b600882161561100b576080611006826fffe5caca7e10e4e61c3624eaa0941cd0611f4d565b901c90505b6010821615611035576080611030826fffcb9843d60f6159c9db58835c926644611f4d565b901c90505b602082161561105f57608061105a826fff973b41fa98c081472e6896dfb254c0611f4d565b901c90505b6040821615611089576080611084826fff2ea16466c96a3843ec78b326b52861611f4d565b901c90505b60808216156110b35760806110ae826ffe5dee046a99a2a811c461f1969c3053611f4d565b901c90505b6101008216156110de5760806110d9826ffcbe86c7900a88aedcffc83b479aa3a4611f4d565b901c90505b610200821615611109576080611104826ff987a7253ac413176f2b074cf7815e54611f4d565b901c90505b61040082161561113457608061112f826ff3392b0822b70005940c7a398e4b70f3611f4d565b901c90505b61080082161561115f57608061115a826fe7159475a2c29b7443b29c7fa6e889d9611f4d565b901c90505b61100082161561118a576080611185826fd097f3bdfd2022b8845ad8f792aa5825611f4d565b901c90505b6120008216156111b55760806111b0826fa9f746462d870fdf8a65dc1f90e061e5611f4d565b901c90505b6140008216156111e05760806111db826f70d869a156d2a1b890bb3df62baf32f7611f4d565b901c90505b61800082161561120b576080611206826f31be135f97d08fd981231505542fcfa6611f4d565b901c90505b62010000821615611237576080611232826f09aa508b5b7a84e1c677de54f3e99bc9611f4d565b901c90505b6202000082161561126257608061125d826e5d6af8dedb81196699c329225ee604611f4d565b901c90505b6204000082161561128c576080611287826d2216e584f5fa1ea926041bedfe98611f4d565b901c90505b620800008216156112b45760806112af826b048a170391f7dc42444e8fa2611f4d565b901c90505b60008460020b13156112cf576112cc81600019611f82565b90505b6112de64010000000082611f96565b156112ea5760016112ed565b60005b6112fe9060ff16602083901c611faa565b949350505050565b6001600160a01b0383166000908152600660205260408120805483929061132e908490611d76565b90915550506001600160a01b0382166000908152600660205260408120805483929061135b908490611faa565b92505081905550816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516113a791815260200190565b60405180910390a3505050565b6000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e060405180830381865afa158015611418573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061143c9190611fe4565b5050505050509050611491817f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000008b8b61173b565b6040805160a080820183526007546001600160a01b039081168385018181526008548084166060808801918252600160a01b90920462ffffff9081166080808a01918252948952336020998a019081528a51998a019690965291518616888a01529051169086015290518216848201528451808503909101815291830193849052633c8a7d8d60e01b9093529296507f000000000000000000000000000000000000000000000000000000000000000090911691633c8a7d8d916115a09130917f0000000000000000000000000000000000000000000000000000000000000000917f0000000000000000000000000000000000000000000000000000000000000000918b919060a40161207e565b60408051808303816000875af11580156115be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115e29190611d8d565b9093509150858310806115f457508482105b15611612576040516397c7f53760e01b815260040160405180910390fd5b509450945094915050565b806004600082825461162f9190611faa565b90915550506001600160a01b0382166000908152600660205260408120805483929061165c908490611faa565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a35050565b80600460008282546116b99190611d76565b90915550506001600160a01b038216600090815260066020526040812080548392906116e6908490611d76565b90915550506040518181526000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161169b565b611735848484846117fd565b50505050565b6000836001600160a01b0316856001600160a01b0316111561175b579293925b846001600160a01b0316866001600160a01b0316116117865761177f8585856118f7565b905061091b565b836001600160a01b0316866001600160a01b031610156117e85760006117ad8786866118f7565b905060006117bc878986611961565b9050806001600160801b0316826001600160801b0316106117dd57806117df565b815b9250505061091b565b6117f3858584611961565b9695505050505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b179052915160009283929088169161186191906120cb565b6000604051808303816000865af19150503d806000811461189e576040519150601f19603f3d011682016040523d82523d6000602084013e6118a3565b606091505b50915091508115806118d157508051158015906118d15750808060200190518101906118cf91906120e7565b155b156118ef576040516316369daf60e31b815260040160405180910390fd5b505050505050565b6000826001600160a01b0316846001600160a01b03161115611917579192915b600061193a856001600160a01b0316856001600160a01b0316600160601b611997565b905061091b61195c848361194e8989612102565b6001600160a01b0316611997565b611a45565b6000826001600160a01b0316846001600160a01b03161115611981579192915b6112fe61195c83600160601b61194e8888612102565b60008080600019858709858702925082811083820303915050806000036119d057600084116119c557600080fd5b5082900490506108e0565b8084116119dc57600080fd5b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b806001600160801b0381168114611a5b57600080fd5b919050565b60005b83811015611a7b578181015183820152602001611a63565b838111156117355750506000910152565b60008151808452611aa4816020860160208601611a60565b601f01601f19169290920160200192915050565b6020815260006108e06020830184611a8c565b6001600160a01b0381168114611ae057600080fd5b50565b60008060408385031215611af657600080fd5b8235611b0181611acb565b946020939093013593505050565b600080600060608486031215611b2457600080fd5b8335611b2f81611acb565b92506020840135611b3f81611acb565b929592945050506040919091013590565b600060208284031215611b6257600080fd5b81356108e081611acb565b600080600080600060a08688031215611b8557600080fd5b853594506020860135935060408601359250606086013591506080860135611bac81611acb565b809150509295509295909350565b6001600160801b0381168114611ae057600080fd5b60008060008060808587031215611be557600080fd5b8435611bf081611bba565b935060208501359250604085013591506060850135611c0e81611acb565b939692955090935050565b60008060008060608587031215611c2f57600080fd5b8435935060208501359250604085013567ffffffffffffffff80821115611c5557600080fd5b818701915087601f830112611c6957600080fd5b813581811115611c7857600080fd5b886020828501011115611c8a57600080fd5b95989497505060200194505050565b60008060408385031215611cac57600080fd5b8235611cb781611acb565b91506020830135611cc781611acb565b809150509250929050565b600181811c90821680611ce657607f821691505b602082108103611d0657634e487b7160e01b600052602260045260246000fd5b50919050565b600080600080600060a08688031215611d2457600080fd5b8551611d2f81611bba565b8095505060208601519350604086015192506060860151611d4f81611bba565b6080870151909250611bac81611bba565b634e487b7160e01b600052601160045260246000fd5b600082821015611d8857611d88611d60565b500390565b60008060408385031215611da057600080fd5b505080516020909101519092909150565b6001600160a01b03959095168552600293840b60208601529190920b60408401526001600160801b03918216606084015216608082015260a00190565b60008060408385031215611e0157600080fd5b8251611e0c81611bba565b6020840151909250611cc781611bba565b6040516060810167ffffffffffffffff81118282101715611e4e57634e487b7160e01b600052604160045260246000fd5b60405290565b60008183036080811215611e6757600080fd5b6040516040810181811067ffffffffffffffff82111715611e9857634e487b7160e01b600052604160045260246000fd5b6040526060821215611ea957600080fd5b611eb1611e1d565b91508335611ebe81611acb565b82526020840135611ece81611acb565b6020830152604084013562ffffff81168114611ee957600080fd5b6040830152908152606083013590611f0082611acb565b60208101919091529392505050565b6000600160ff1b8201611f2457611f24611d60565b5060000390565b60008160020b627fffff198103611f4457611f44611d60565b60000392915050565b6000816000190483118215151615611f6757611f67611d60565b500290565b634e487b7160e01b600052601260045260246000fd5b600082611f9157611f91611f6c565b500490565b600082611fa557611fa5611f6c565b500690565b60008219821115611fbd57611fbd611d60565b500190565b805161ffff81168114611a5b57600080fd5b80518015158114611a5b57600080fd5b600080600080600080600060e0888a031215611fff57600080fd5b875161200a81611acb565b8097505060208801518060020b811461202257600080fd5b955061203060408901611fc2565b945061203e60608901611fc2565b935061204c60808901611fc2565b925060a088015160ff8116811461206257600080fd5b915061207060c08901611fd4565b905092959891949750929550565b60018060a01b03861681528460020b60208201528360020b60408201526001600160801b038316606082015260a0608082015260006120c060a0830184611a8c565b979650505050505050565b600082516120dd818460208701611a60565b9190910192915050565b6000602082840312156120f957600080fd5b6108e082611fd4565b60006001600160a01b038381169083168181101561212257612122611d60565b03939250505056fea26469706673582212200ff02fb1a93ef42e6d21ff64febfaa1fdfb22d355ada98da3083da1a0fb8aacb64736f6c634300080e0033";

export class UniV3PairManager__factory extends ContractFactory {
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
    _pool: string,
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UniV3PairManager> {
    return super.deploy(
      _pool,
      _governance,
      overrides || {}
    ) as Promise<UniV3PairManager>;
  }
  getDeployTransaction(
    _pool: string,
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_pool, _governance, overrides || {});
  }
  attach(address: string): UniV3PairManager {
    return super.attach(address) as UniV3PairManager;
  }
  connect(signer: Signer): UniV3PairManager__factory {
    return super.connect(signer) as UniV3PairManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniV3PairManagerInterface {
    return new utils.Interface(_abi) as UniV3PairManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniV3PairManager {
    return new Contract(address, _abi, signerOrProvider) as UniV3PairManager;
  }
}