/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20ForTest, ERC20ForTestInterface } from "../ERC20ForTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_initialAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialBalance",
        type: "uint256",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
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
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approveInternal",
    outputs: [],
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
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
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
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
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
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferInternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001069380380620010698339810160408190526200003491620002dd565b8351849084906200004d9060039060208501906200016a565b508051620000639060049060208401906200016a565b5050506200007882826200008260201b60201c565b50505050620003d3565b6001600160a01b038216620000dd5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620000f1919062000370565b90915550506001600160a01b038216600090815260208190526040812080548392906200012090849062000370565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001789062000397565b90600052602060002090601f0160209004810192826200019c5760008555620001e7565b82601f10620001b757805160ff1916838001178555620001e7565b82800160010185558215620001e7579182015b82811115620001e7578251825591602001919060010190620001ca565b50620001f5929150620001f9565b5090565b5b80821115620001f55760008155600101620001fa565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200023857600080fd5b81516001600160401b038082111562000255576200025562000210565b604051601f8301601f19908116603f0116810190828211818310171562000280576200028062000210565b816040528381526020925086838588010111156200029d57600080fd5b600091505b83821015620002c15785820183015181830184015290820190620002a2565b83821115620002d35760008385830101525b9695505050505050565b60008060008060808587031215620002f457600080fd5b84516001600160401b03808211156200030c57600080fd5b6200031a8883890162000226565b955060208701519150808211156200033157600080fd5b50620003408782880162000226565b604087015190945090506001600160a01b03811681146200036057600080fd5b6060959095015193969295505050565b600082198211156200039257634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680620003ac57607f821691505b602082108103620003cd57634e487b7160e01b600052602260045260246000fd5b50919050565b610c8680620003e36000396000f3fe6080604052600436106100f35760003560e01c806356189cb41161008a578063a457c2d711610059578063a457c2d71461029b578063a9059cbb146102bb578063b6b55f25146102db578063dd62ed3e146102ec57600080fd5b806356189cb41461021057806370a082311461023057806395d89b41146102665780639dc29fac1461027b57600080fd5b806323b872dd116100c657806323b872dd14610194578063313ce567146101b457806339509351146101d057806340c10f19146101f057600080fd5b806306fdde03146100f8578063095ea7b31461012357806318160ddd14610153578063222f5be014610172575b600080fd5b34801561010457600080fd5b5061010d61030c565b60405161011a9190610a8c565b60405180910390f35b34801561012f57600080fd5b5061014361013e366004610afd565b61039e565b604051901515815260200161011a565b34801561015f57600080fd5b506002545b60405190815260200161011a565b34801561017e57600080fd5b5061019261018d366004610b27565b6103b6565b005b3480156101a057600080fd5b506101436101af366004610b27565b6103c6565b3480156101c057600080fd5b506040516012815260200161011a565b3480156101dc57600080fd5b506101436101eb366004610afd565b6103ea565b3480156101fc57600080fd5b5061019261020b366004610afd565b61040c565b34801561021c57600080fd5b5061019261022b366004610b27565b61041a565b34801561023c57600080fd5b5061016461024b366004610b63565b6001600160a01b031660009081526020819052604090205490565b34801561027257600080fd5b5061010d610425565b34801561028757600080fd5b50610192610296366004610afd565b610434565b3480156102a757600080fd5b506101436102b6366004610afd565b61043e565b3480156102c757600080fd5b506101436102d6366004610afd565b6104be565b6101926102e9366004610b85565b50565b3480156102f857600080fd5b50610164610307366004610b9e565b6104cc565b60606003805461031b90610bd1565b80601f016020809104026020016040519081016040528092919081815260200182805461034790610bd1565b80156103945780601f1061036957610100808354040283529160200191610394565b820191906000526020600020905b81548152906001019060200180831161037757829003601f168201915b5050505050905090565b6000336103ac8185856104f7565b5060019392505050565b6103c183838361061b565b505050565b6000336103d48582856107eb565b6103df85858561061b565b506001949350505050565b6000336103ac8185856103fd83836104cc565b6104079190610c21565b6104f7565b610416828261085f565b5050565b6103c18383836104f7565b60606004805461031b90610bd1565b610416828261093e565b6000338161044c82866104cc565b9050838110156104b15760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6103df82868684036104f7565b6000336103ac81858561061b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166105595760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104a8565b6001600160a01b0382166105ba5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104a8565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03831661067f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104a8565b6001600160a01b0382166106e15760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104a8565b6001600160a01b038316600090815260208190526040902054818110156107595760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104a8565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610790908490610c21565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107dc91815260200190565b60405180910390a35b50505050565b60006107f784846104cc565b905060001981146107e557818110156108525760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104a8565b6107e584848484036104f7565b6001600160a01b0382166108b55760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104a8565b80600260008282546108c79190610c21565b90915550506001600160a01b038216600090815260208190526040812080548392906108f4908490610c21565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b03821661099e5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104a8565b6001600160a01b03821660009081526020819052604090205481811015610a125760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104a8565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610a41908490610c39565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600060208083528351808285015260005b81811015610ab957858101830151858201604001528201610a9d565b81811115610acb576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610af857600080fd5b919050565b60008060408385031215610b1057600080fd5b610b1983610ae1565b946020939093013593505050565b600080600060608486031215610b3c57600080fd5b610b4584610ae1565b9250610b5360208501610ae1565b9150604084013590509250925092565b600060208284031215610b7557600080fd5b610b7e82610ae1565b9392505050565b600060208284031215610b9757600080fd5b5035919050565b60008060408385031215610bb157600080fd5b610bba83610ae1565b9150610bc860208401610ae1565b90509250929050565b600181811c90821680610be557607f821691505b602082108103610c0557634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c3457610c34610c0b565b500190565b600082821015610c4b57610c4b610c0b565b50039056fea2646970667358221220125fb0f7685505f50c8f9d0911f8f28d5eea788c38dd453ba1546e4fa737466f64736f6c634300080e0033";

export class ERC20ForTest__factory extends ContractFactory {
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
    _name: string,
    _symbol: string,
    _initialAccount: string,
    _initialBalance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20ForTest> {
    return super.deploy(
      _name,
      _symbol,
      _initialAccount,
      _initialBalance,
      overrides || {}
    ) as Promise<ERC20ForTest>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    _initialAccount: string,
    _initialBalance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _initialAccount,
      _initialBalance,
      overrides || {}
    );
  }
  attach(address: string): ERC20ForTest {
    return super.attach(address) as ERC20ForTest;
  }
  connect(signer: Signer): ERC20ForTest__factory {
    return super.connect(signer) as ERC20ForTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20ForTestInterface {
    return new utils.Interface(_abi) as ERC20ForTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20ForTest {
    return new Contract(address, _abi, signerOrProvider) as ERC20ForTest;
  }
}
