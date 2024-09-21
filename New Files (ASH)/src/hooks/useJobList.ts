import { useContractRead } from 'wagmi';
import abiTask from '@/abi/abiTask.json';
import {Address, formatEther} from 'viem';
import { useEffect, useState } from 'react';
import { Job } from '@/states/common';
// ----------------------------------------------------------------------

const taskContractAddress = process.env.NEXT_PUBLIC_TASK || "0x0";

export default function useJobList() {

    const [jobList, setJobList] = useState<Job[]>([]);
    
    const {data, isError, isLoading} = useContractRead({
        address: taskContractAddress as Address,
        abi: abiTask,
        functionName: "getJobList",
        watch: true,
    })

    useEffect(() => {
      if(!isLoading && !isError && data) {
        const newJobList: Job[] = [];
        if(Array.isArray(data)) {
          data.forEach((item: Job, index: number) => {
            newJobList.push({
              index,
              jobLevel: item.jobLevel,
              title: item.title,
              tgrEarning: item.tgrEarning,
              jobType: Number(item.jobType.toString()),
              escrowAmount: formatEther(BigInt(item.escrowAmount)),
              defineTime: Number(item.defineTime),
              completionTime: Number(item.completionTime),
              buyer: item.buyer,
              description: item.description,
              validationPeriod: Number(item.validationPeriod),
              endTime: Number(item.validationPeriod),
              status: Number(item.status),
              buyerReview: Number(item.buyerReview),
              buyerReviewComment: item.buyerReviewComment,
              sellerReview: Number(item.sellerReview),
              sellerReviewComment: item.sellerReviewComment,
              createdAt: Number(item.createdAt),
              submittedAt: Number(item.submittedAt),
              disputedAt: Number(item.disputedAt),
              doneAt: Number(item.doneAt),
              withdrawedAt: Number(item.withdrawedAt)
            });
          });
        }
        setJobList(newJobList);
      }
    }, [data, isError, isLoading])

  return jobList;
}
