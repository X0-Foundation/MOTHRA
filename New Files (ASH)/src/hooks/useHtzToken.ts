import abiErc20 from '@/abi/abiErc20.json';
import { useEffect, useState } from 'react';
import { Abi, Address, formatEther } from 'viem';
import { useAccount, useContractReads } from 'wagmi';

const htzTokenAddress = process.env.NEXT_PUBLIC_HTZ || 0x0;
const taskContractAddress = process.env.NEXT_PUBLIC_TASK || '0x0';

const htzTokenContract = {
  address: htzTokenAddress as Address,
  abi: abiErc20 as Abi,
};

export default function useHtzToken() {
  const { address } = useAccount();

  const [htzBalance, setHtzBalance] = useState(0);
  const [htzAllowance, setHtzAllowance] = useState(0);
  const [isApproved, setIsApproved] = useState(false);

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...htzTokenContract,
        functionName: 'balanceOf',
        args: [address || ''],
      },
      {
        ...htzTokenContract,
        functionName: 'allowance',
        args: [address || '', taskContractAddress],
      },
      {
        ...htzTokenContract,
        functionName: 'balanceOf',
        args: [taskContractAddress],
      },
    ],
    watch: true,
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      if (data[0].status === 'success' && data[0].result) {
          setHtzBalance(Number(formatEther(data[0].result as bigint)));
      } else {
        setHtzBalance(0);
      }

      if (data[1].status === 'success' && data[1].result) {
        const _allowance = formatEther(data[1].result as bigint);
        setHtzAllowance(Number(_allowance));
        if (parseInt(_allowance, 10) > 0) {
          setIsApproved(true);
        } else {
            setIsApproved(false);
        }
      } else {
        setHtzAllowance(0);
        setIsApproved(false);
      }
    }
  }, [data, isError, isLoading]);

  useEffect(() => {
    if(Number(htzAllowance) > Number(htzBalance)) {
      setHtzAllowance(htzBalance);
    }
  }, [htzBalance, htzAllowance])

  return {
    balance: htzBalance,
    isApproved,
    allowance: htzAllowance,
    refetch
  };
}
