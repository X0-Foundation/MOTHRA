import { useEffect, useState } from 'react';
import { Address, formatEther } from 'viem';
import { useContractReads } from 'wagmi';
import { Job, taskContractAddress } from '@/states/common';
import abiTask from '@/abi/abiTask.json';

// ----------------------------------------------------------------------

const taskContract = {
  address: taskContractAddress as Address,
  abi: abiTask,
};

export default function useTaskContract() {
  const [jobTypes, setJobTypes] = useState<String[]>([]);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [submissionDisputeDuration, setSubmissionDisputeDuration] = useState(500);
  const [validationDuration, setValidationDuration] = useState(300);

  const callContext: any[] = [];


  // Get job list
  callContext.push({
    ...taskContract,
    functionName: 'getJobTypes',
  });
  // Get job types
  callContext.push({
    ...taskContract,
    functionName: 'getJobList',
  });
  // Get submissionDisputeDuration
  callContext.push({
    ...taskContract,
    functionName: 'getSubmissionDisputeDuration'
  })
  // Get validationDuration
  callContext.push({
    ...taskContract,
    functionName: 'getDuration'
  })

  const { data, isError, isLoading } = useContractReads({
    contracts: callContext,
    watch: true,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (data[0].status === 'success' && Array.isArray(data[0].result)) setJobTypes(data[0].result);

      const newJobList: Job[] = [];
      if (data[1].status === 'success' && Array.isArray(data[1].result)) {
        data[1].result.forEach((item: Job, index: number) => {
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

      if (data[2].status === 'success') {
        setSubmissionDisputeDuration(Number(data[2].result));
      }
      if (data[3].status === 'success') {
        setValidationDuration(Number(data[3].result));
      }
    }
  }, [data, isError, isLoading]);

  return { jobTypes, jobList, submissionDisputeDuration, validationDuration };
}