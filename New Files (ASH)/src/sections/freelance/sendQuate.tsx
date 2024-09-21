/* eslint-disable import/no-cycle */
import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, FormControl, TextField, DialogActions, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Address } from 'viem';
import { taskContractAddress } from "@/states/common";
import ToastMessage from "@/components/toast";
import abiTask from '@/abi/abiTask.json';
import { JobDialogProps } from "./createJob";

export default function SendQuate(props: JobDialogProps) {
    const { onClose, open, row } = props;
    
    const [loading, setLoading] = useState(false);
    const [quate, setQuate] = useState('');
    const [error, setError] = useState('');

    const notify = (type: string, message: string) => {
        ToastMessage({type, message});
    }
    
    const handleClose = useCallback(() => {
        setQuate('')
        setError('');
        onClose("");
    },[onClose])

    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();

    const handleProcess = useCallback(async ()=>{
        if(row === undefined) return;
        if(quate === '') {
            setError("Please write your quate");
            return;
        }
        try {
            setLoading(true);
            const { request } = await prepareWriteContract({
                address: taskContractAddress as Address,
                abi: abiTask,
                functionName: 'addBidder',
                args: [row.index, quate],
            });        
            const { hash } = await writeContract(request);        
            await waitForTransaction({hash});
            
            setLoading(false);
            notify("success", "Successfully sent your quate");
            handleClose();
        } catch (err) {
            setLoading(false);
            console.error(err);
            notify("error", "Failed sending your quate");
        }
    }, [handleClose, quate, row]);

    const handleChange = useCallback((e:any)=>{
        setQuate(e.target.value);
        setError('');
    }, [])
    
    return(
        <Dialog onClose={handleClose} open={open} fullWidth sx={{pl: 2, pr: 2 }}>
            <DialogTitle>Send Quate</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can send a quate for job in here.
                </DialogContentText>
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
                            id="quate"
                            label="Your Quate *" 
                            multiline rows={6} 
                            value={quate}
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
                    <Button onClick={()=>handleProcess()} disabled={loading}>{loading ? "Processing" : "Send a Quate"}</Button>
                ) : (
                    openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                )}
            </DialogActions>
        </Dialog>
    )
}