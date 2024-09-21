import { useContractReads } from 'wagmi';
import abiTask from '@/abi/abiTask.json';
import {Address} from 'viem';
import { useEffect, useState } from 'react';
import { Job, AgentsForJob, Bid } from '@/states/common';
import useJobList from './useJobList';
// ----------------------------------------------------------------------

const taskContractAddress = process.env.NEXT_PUBLIC_TASK || "0x0";

const taskContract = {
    address: taskContractAddress as Address,
    abi: abiTask
}
export default function useAgentsForJobs() {

    const [agentsForJobs, setAgentsForJobs] = useState<AgentsForJob[]>([]);

    const jobList = useJobList();

    const callContext: any[] = [];

    jobList.forEach((item:Job) => {
        callContext.push({
            ...taskContract,
            functionName: "getAgentsForJob",
            args: [item.index]
        })
    })
    
    const {data, isError, isLoading} = useContractReads({
        contracts: callContext,
        watch: true
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        if(!isLoading && !isError && data) {
            const resArray: AgentsForJob[] = [];
            data.forEach((item: any, index: number) => {
                if(item.status === 'success') {
                    const bidders: Bid[] = [];
                    if(item.result.bidders.length > 0) {
                        item.result.bidders.forEach((res:any) => {
                            bidders.push({
                                bidder: res.bidder,
                                description: res.description
                            })
                        })
                    }
                    resArray.push({
                        submittedComment:item.result.submittedComment,
                        seller: item.result.seller,
                        bidders,
                        verifiers: item.result.verifiers,
                        validators: item.result.validators
                        // approvalValidators: item.result.approvalValidators,
                        // approvalDeniers: item.result.approvalDeniers,
                        // completionValidators: item.result.completionValidators,
                        // completionDeniers: item.result.completionDeniers,
                        // tempValidators: item.result.tempValidators,
                        // tempDeniers: item.result.tempDeniers
                    });
                }
            });

            setAgentsForJobs(resArray);
        }
    }, [data, isError, isLoading])

  return {agentsForJobs};
}
