import abiAgent from '@/abi/abiAgent.json';
import { useEffect, useState } from 'react';
import { Abi, Address, formatEther } from 'viem';
import { useAccount, useContractReads } from 'wagmi';

// const htzTokenAddress = process.env.NEXT_PUBLIC_HTZ || 0x0;
const agentContractAddress = process.env.NEXT_PUBLIC_AGENT || '0x0';

export default function useAgentContract() {
  const { address } = useAccount();

  const [userLevel, setUserLevel] = useState(0);
  const [userTgrStakedTokenBalance, setUserTgrStakedTokenBalance] = useState(0);
  const [lockedTime, setLockedTime] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'getLevelOfAgent',
        args: [address || ''],
      },
      {
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'getStakedAmountOfAgent',
        args: [address || ''],
      },
      {
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'lockedTime',
      },
      {
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'maxLevel',
      }
    ],
    watch: true,
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      if (data[0].status === 'success' && data[0].result) {
        setUserLevel(Number(data[0].result));
      } else {
        setUserLevel(0);
      }
      if (data[1].status === 'success' && data[1].result) {
        setUserTgrStakedTokenBalance(Number(formatEther(data[1].result as bigint)));
      } else {
        setUserTgrStakedTokenBalance(0);
      }
      if(data[2].status === 'success' && data[2].result) {
        setLockedTime(Number(data[2].result as bigint) * 1000);
      } else {
        setLockedTime(0)
      }
      if(data[3].status === 'success' && data[3].result) {
        setMaxLevel(Number(data[3].result as bigint));
      } else {
        setMaxLevel(0)
      }
    }
  }, [data, isError, isLoading]);

  return {
    userLevel,
    userTgrStakedTokenBalance,
    lockedTime,
    maxLevel
  };
}

