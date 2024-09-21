import { useEffect, useState } from 'react';
import { Abi, Address, formatEther } from 'viem';
import { useAccount, useContractReads } from 'wagmi';
import { agentContractAddress, tgrTokenAddress } from '@/states/common';
import abiErc20 from '@/abi/abiErc20.json';

const tgrTokenContract = {
  address: tgrTokenAddress as Address,
  abi: abiErc20 as Abi,
};

export default function useTgrToken() {
  const { address } = useAccount();

  const [tgrBalance, setTgrBalance] = useState(0);
  const [tgrAllowance, setTgrAllowance] = useState(0);
  const [isApproved, setIsApproved] = useState(false);

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...tgrTokenContract,
        functionName: 'balanceOf',
        args: [address || ''],
      },
      {
        ...tgrTokenContract,
        functionName: 'allowance',
        args: [address || '', agentContractAddress],
      },
    ],
    watch: true,
  });

  useEffect(() => {
    if (!isError && !isLoading && data) {
      if (data[0].status === 'success' && data[0].result) {
        setTgrBalance(Number(formatEther(data[0].result as bigint)));
      } else {
        setTgrBalance(0);
      }

      if (data[1].status === 'success' && data[1].result) {
        const _allowance = formatEther(data[1].result as bigint);
        setTgrAllowance(Number(_allowance));
        if (parseInt(_allowance, 10) > 0) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      } else {
        setTgrAllowance(0);
        setIsApproved(false);
      }
    }
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (Number(tgrAllowance) > Number(tgrBalance)) {
      setTgrAllowance(tgrBalance);
    }
  }, [tgrBalance, tgrAllowance]);

  return {
    balance: tgrBalance,
    isApproved,
    allowance: tgrAllowance,
    refetch,
  };
}