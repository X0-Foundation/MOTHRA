import { useContractRead } from 'wagmi';
import abiTask from '@/abi/abiTask.json';
import {Address} from 'viem';
import { useEffect, useState } from "react";
// ----------------------------------------------------------------------

const taskContractAddress = process.env.NEXT_PUBLIC_TASK || "0x0";


export default function useJobTypes():String[] {

    const [jobTypes, setJobTypes] = useState<String[]>([])

    const {data, isError, isLoading} = useContractRead({
        address: taskContractAddress as Address,
        abi: abiTask,
        functionName: "getJobTypes",
        watch: true,
    })

    useEffect(() => {
        if(!isLoading && !isError && data) {
          if(Array.isArray(data))
            setJobTypes(data);
        }
    }, [data, isError, isLoading])

  return jobTypes;
}
