/* eslint-disable import/no-cycle */
import { Dialog, DialogContent, DialogTitle, Box, FormControl, TextField, DialogActions, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Address } from 'viem';
import { taskContractAddress } from "@/states/common";
import ToastMessage from "@/components/toast";
import abiTask from '@/abi/abiTask.json';
import { JobDialogProps } from "./createJob";

export default function SubmitJob(props: JobDialogProps) {
    const { onClose, open, row } = props;
    
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const notify = (type: string, message: string) => {
        ToastMessage({type, message});
    }
    
    const handleClose = useCallback(() => {
        setComment('')
        setError('');
        onClose("");
    },[onClose])

    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();

    const handleProcess = useCallback(async ()=>{
        if(row === undefined) return;
        if(comment === '') {
            setError("Please write your comment");
            return;
        }
        try {
            setLoading(true);
            const { request } = await prepareWriteContract({
                address: taskContractAddress as Address,
                abi: abiTask,
                functionName: 'submitJob',
                args: [row.index, comment],
            });        
            const { hash } = await writeContract(request);        
            await waitForTransaction({hash});
            
            setLoading(false);
            notify("success", "Successfully Submitted");
            handleClose();
        } catch (err) {
            setLoading(false);
            console.error(err);
            notify("error", "Failed Submitting");
        }
    }, [handleClose, comment, row]);

    const handleChange = useCallback((e:any)=>{
        setComment(e.target.value);
        setError('');
    }, [])
    
    return(
        <Dialog onClose={handleClose} open={open} fullWidth sx={{pl: 2, pr: 2 }}>
            <DialogTitle>Submit your work result</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }} >
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_title"
                            label="Job Title"
                            value={row?.title}
                            InputProps={{ readOnly: true}}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField 
                            id="job_description" 
                            label="Job Description" 
                            multiline rows={4} 
                            value={row?.description} 
                            InputProps={{ readOnly: true}}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField 
                            id="comment"
                            label="Your Comment *" 
                            multiline rows={6} 
                            value={comment}
                            onChange={handleChange}
                            error={error !== ''}
                            helperText={error !== '' ? error: ''}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                {isConnected ? (
                    <Button onClick={()=>handleProcess()} disabled={loading}>{loading ? "Processing..." : "Submit a Job"}</Button>
                ) : (
                    openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                )}
            </DialogActions>
        </Dialog>
    )
}