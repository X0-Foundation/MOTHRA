import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
// import { BigNumber } from "ethers";
import { useState, useEffect, useCallback } from "react";
import ToastMessage from "@/components/toast";
import { JOB_LEVELS, JOB_STATUS, Job, Vote, compareAddress, taskContractAddress, isLimitTimeOver, isTimeOver } from "@/states/common";
import { useAccount } from "wagmi";
import {prepareWriteContract, writeContract, waitForTransaction} from '@wagmi/core';
import { useAgentContract, useAgentsForJobs, useTaskContract } from "@/hooks";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Address } from 'viem';
import abiTask from '@/abi/abiTask.json';
import Link from "next/link";
import { formatAddressWithMiddleDot } from "@/utils/formatAddress";

const taskContract = {
    address: taskContractAddress as Address,
    abi: abiTask,
};

export interface CreateJobDialogProps {
    open: boolean,
    onClose: (value: string) => void;
    row: Job | undefined,
}

export default function VerificationJob(props: CreateJobDialogProps) {
    const { onClose, open, row } = props;

    const { openConnectModal } = useConnectModal();
    const {address, isConnected} = useAccount();
    const {jobTypes, submissionDisputeDuration, validationDuration} = useTaskContract();
    const { userLevel } = useAgentContract();
    const {agentsForJobs} = useAgentsForJobs();

    const [isVerified, setIsVerified] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isDenying, setIsDenying] = useState(false);
    // const [isDropping, setIsDropping] = useState(false);
    const [isDisputing, setIsDisputing] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isDisputingSubmission, setIsDisputingSubmission] = useState(false);

    const [completionDate, setCompletionDate] = useState<Date | null>(new Date());
    const [jobLevel, setJobLevel] = useState(0);
    const [jobType, setJobType] = useState(0);
    const [jobTypeError, setJobTypeError] = useState('')
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobDescriptionError, setJobDescriptionError] = useState('');
    const [escrowAmount, setEscrowAmount] = useState('');
    const [escrowAmountError, setEscrowAmountError] = useState('');
    const [tgrEarning, setTgrEarning] = useState(false);

    const initForm = () => {
        setJobLevel(-1);
        setJobType(-1);
        setJobTitle('');
        setJobDescription('');
        setEscrowAmount('');
        setCompletionDate(new Date());
        setTgrEarning(false);
    }

    const notify = (type: string, message: string) => {
        ToastMessage({ type, message });
    }

    const onCloseDialog = useCallback(() => {
        onClose("");
    }, [onClose])

    // const handlePostJob = useCallback(async (_isCompleted:boolean = false)=>{
    //     if(row) {
    //         try {
    //             setLoading(true);
    //             const { request } = await prepareWriteContract({
    //                 address: taskContractAddress as Address,
    //                 abi: abiTask,
    //                 functionName: _isCompleted ? 'treatEscrowOnCompletionAndSlash' : 'treatApprovalOnValidationAndSlash',
    //                 args: [row.index],
    //             });            
    //             const { hash } = await writeContract(request);            
    //             await waitForTransaction({hash});

    //             setLoading(false);
    //             notify("success", `Successfully ${_isCompleted ? "completed" : "posted"}`);
    //             onCloseDialog();
    //         } catch (err) {
    //             setLoading(false);
    //             console.error(err);
    //             notify("error", `Failed ${_isCompleted ? "completing" : "posting"}`);
    //         }
            
    //     }
    // }, [onCloseDialog, row])

    const handleApproveJob = useCallback(async () => {
        if (row === undefined || !row) return;
        // console.log(row.jobLevel, userLevel)
        // if (userLevel === 0 || row.jobLevel > userLevel) {
        if (row.jobLevel > userLevel) {
            notify('warning', "Your level is not available")
            return;
        }

        try {
            setIsApproving(true);
            setLoading(true)
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'verifyJob',
                args: [row.index, true],
            });
            const { hash } = await writeContract(request);
            await waitForTransaction({hash});

            setIsApproving(false);
            setLoading(false)
            notify("success", "Successfully approved");
            onCloseDialog();
        } catch (err) {
            console.error(err);
            setIsApproving(false);
            setLoading(false)
            notify("error", "Transaction Failed");
        }

    }, [onCloseDialog, row, userLevel]);

    const handleDenyJob = useCallback(async () => {
        if (row === undefined) return;
        // if (userLevel === 0 || row.jobLevel > userLevel) {
        if (row.jobLevel > userLevel) {
            notify('warning', "Your level is not available")
            return;
        }

        try {
            setLoading(true)
            setIsDenying(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'verifyJob',
                args: [row.index, false],
              });            
              const { hash } = await writeContract(request);            
              await waitForTransaction({hash});
              
              setIsDenying(false);
              setLoading(false)
              notify("success", "Successfully denied");
              onCloseDialog();
        } catch (err) {
            setIsDenying(false);
            setLoading(false)
            notify("error", "Transaction Failed");
        }

    }, [onCloseDialog, row, userLevel]);

    const handleDisputeJob = useCallback(async () => {
        if (row === undefined) return;
        if (userLevel === 0 || row.jobLevel > userLevel) {
            notify('warning', "Your level is not available")
            return;
        }

        try {
            setLoading(true)
            setIsDisputing(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'disputeJob',
                args: [row.index],
              });            
              const { hash } = await writeContract(request);            
              await waitForTransaction({hash});
              
              setIsDisputing(false);
              setLoading(false)
              notify("success", "Successfully Disputed");
              onCloseDialog();
        } catch (err) {
            setIsDisputing(false);
            setLoading(false)
            notify("error", "Transaction Failed");
        }

    }, [onCloseDialog, row, userLevel]);

    const handleDisputeSubmission = useCallback(async () => {
        if (row === undefined) return;
        if (userLevel === 0 || row.jobLevel > userLevel) {
            notify('warning', "Your level is not available")
            return;
        }
        try {
            setIsDisputingSubmission(true);
            setLoading(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'disputeSubmission',
                args: [row.index],
              });            
              const { hash } = await writeContract(request);            
              await waitForTransaction({hash});
              
              setIsDisputingSubmission(false);
              setLoading(false)
              notify("success", "Successfully Disputed Submission");
              onCloseDialog();
        } catch (err) {
            setIsDisputingSubmission(false);
            setLoading(false)
            notify("error", "Failed Disputing Submission");
        }
    }, [onCloseDialog, row, userLevel])
    
    const handleValidateJob = useCallback(async (jobId: number) => {
        try {
            setLoading(true);
            setIsValidating(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'validateJob',
                args: [jobId],
            });
            const { hash } = await writeContract(request);
            await waitForTransaction({hash});
            
            setLoading(false);
            setIsValidating(false);
            notify("success", "Successfully Validated");
            onCloseDialog()
        } catch (err) {
            console.error(err);
            setLoading(false);
            setIsValidating(false);
            notify("error", "Failed Validating");
        }
    }, [onCloseDialog]);

    // const handleDropJob = useCallback(async () => {
    //     if (row === undefined) return;
        
    //     try {
    //         setIsDropping(true);
    //         setLoading(true);
    //         const { request } = await prepareWriteContract({
    //             ...taskContract,
    //             functionName: 'refundEscrowToBuyer',
    //             args: [row.index],
    //           });            
    //           const { hash } = await writeContract(request);            
    //           await waitForTransaction({hash});
              
    //           setIsDropping(false);
    //           setLoading(false)
    //           notify("success", "Successfully Dropped");
    //           onCloseDialog();
    //     } catch (err) {
    //         setIsDropping(false);
    //         setLoading(false)
    //         notify("error", "Failed Dropping");
    //     }
    // }, [onCloseDialog, row]);

    const onChangeJobType = (e: any) => {
        setJobType(e.target.value);
        setJobTypeError('')
    }

    const onChangeJobTitle = (e: any) => {
        setJobTitle(e.target.value);
        setJobTitleError('')
    }

    const onChangeJobDescription = (e: any) => {
        setJobDescription(e.target.value);
        setJobDescriptionError('')
    }

    const onChangeEscrowAmount = (e: any) => {
        setEscrowAmount(e.target.value);
        setEscrowAmountError('')
    }

    const onChangeTgrEarning = (e: any) => {
        setTgrEarning(e.target.checked);
    }

    const ownerButtons = () => {
        if(row && row.status === JOB_STATUS.VERIFIED_POST && isTimeOver(row.validationPeriod)) {
            return <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>{isValidating?"Validating...": "Validate"}</Button>
        }
        // return <Button onClick={() => handleDropJob()} disabled={isDropping}>{isDropping ? "Dropping..." : "Drop a Job"}</Button>
            
        if (row && row.status >= JOB_STATUS.JOB_SUBMITTED && row.status < JOB_STATUS.COMPLETED1) {
            if(row.status === JOB_STATUS.VALIDATED_SUBMITTED) {
                // TODO: To complete a job
                return <Button onClick={() => {}} disabled={loading}>{loading?"Processing...":"Complete Job"}</Button>
            }
            if(row.status === JOB_STATUS.JOB_SUBMITTED && compareAddress(row.buyer, address)) {
                if (isLimitTimeOver(row.submittedAt, submissionDisputeDuration)) {
                    return <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>{loading?"Validating...":"Validate"}</Button>
                }
                return (
                    <>
                        <Button onClick={() => handleDisputeSubmission()} disabled={loading}>{isDisputingSubmission ? "Disputing...":"Dispute Submission"}</Button>
                        <Button>Drop a Job</Button>
                    </>
                )
            }
            if(
                (row.status === JOB_STATUS.DISPUTE_SUBMITTED && isLimitTimeOver(row.disputedAt, validationDuration)) ||
                (row.status === JOB_STATUS.VALIDATED_DISPUTE && isTimeOver(row.validationPeriod))
            ) {
                return <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>{loading?"Validating...":"Validate"}</Button>
            }
        }
        return <div />
    }

    useEffect(() => {
        setIsDisabled(true)
        if (row) {
            setJobLevel(row.jobLevel)
            setJobType(row.jobType);
            setJobTitle(row.title);
            setJobDescription(row.description);
            setEscrowAmount(row.escrowAmount);
            setCompletionDate(new Date(row.completionTime * 1000));
            setTgrEarning(row.tgrEarning);

            if (compareAddress(row.buyer, address)) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }

            let _isVerified = 0; 
            agentsForJobs[row.index]?.validators?.forEach((item: Vote) => {
                if (item.result) _isVerified += 1;
                else _isVerified -= 1;
            })

            if (_isVerified > 0) setIsVerified(true)
            else setIsVerified(false);
        } else {
            setIsOwner(false)
            setIsDisabled(false);
            initForm();
        }
    }, [address, agentsForJobs, row])

    return (
        <Dialog onClose={onCloseDialog} open={open}>
            {row ? (
                <DialogTitle>Verification Job</DialogTitle>
            ) : (
                <DialogTitle>Create Job</DialogTitle>
            )}
            <DialogContent>
                {row && ([JOB_STATUS.VERIFYING, JOB_STATUS.VERIFYING_SUBMITTED].includes(row.status)) ? (
                    <DialogContentText>Job is waiting verification for posting</DialogContentText>
                ) : (
                    <>
                        {
                            (row && ([JOB_STATUS.JOB_SUBMITTED].includes(row.status))) ? (
                                <DialogContentText>Job is <span style={{color: 'white'}}>Submitted</span> by <Link href={`/agency/profile?address=${agentsForJobs[row.index]?.seller}`} style={{textDecoration:'none', color:'rgb(118, 53, 220)', fontWeight: 'bold'}} target="_blank">{formatAddressWithMiddleDot(agentsForJobs[row.index]?.seller)}</Link></DialogContentText>
                            ) : (
                                <>
                                    {
                                        row && ([JOB_STATUS.DISPUTE_SUBMITTED].includes(row.status)) ? (
                                            <DialogContentText>Submission is <span style={{color: 'white'}}>Disputed</span> by Job Owner</DialogContentText>
                                        ) : (
                                            <DialogContentText>Job is <span style={{color: 'white'}}>{isVerified ? 'Approved' : 'Denied'}</span> and waiting validation for 48 hours</DialogContentText>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )}
                <Box>
                    {row && !compareAddress(row.buyer, address) && (
                        <DialogContentText>Please click <Link href={`/agency/profile?address=${row.buyer}`} style={{textDecoration:'none', color:'rgb(118, 53, 220)', fontWeight: 'bold'}} target="_blank">Here</Link> to see job owner`s profile</DialogContentText>
                    )}
                </Box>
                <Box
                    sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                >
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_level"
                            select
                            label="Job Level *"
                            variant={isDisabled ? "standard" : "outlined"}
                            defaultValue="0"
                            value={jobLevel}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        >
                            <MenuItem key={0} value="-1">Please select...</MenuItem>
                            {JOB_LEVELS.map((option, index) => (
                                <MenuItem key={index + 1} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_type"
                            select
                            label="Job Type *"
                            variant={isDisabled ? "standard" : "outlined"}
                            defaultValue="0"
                            value={jobType}
                            onChange={onChangeJobType}
                            error={jobTypeError !== ''}
                            helperText={jobTypeError !== '' ? jobTypeError : ''}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        >
                            <MenuItem key={0} value="-1">Please select...</MenuItem>
                            {jobTypes.map((option, index) => (
                                <MenuItem key={index + 1} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_title"
                            label="Job Title *"
                            variant={isDisabled ? "standard" : "outlined"}
                            value={jobTitle}
                            onChange={onChangeJobTitle}
                            error={jobTitleError !== ''}
                            helperText={jobTitleError !== '' ? jobTitleError : ''}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_description"
                            label="Job Description *"
                            multiline rows={5}
                            variant={isDisabled ? "standard" : "outlined"}
                            value={jobDescription}
                            onChange={onChangeJobDescription}
                            error={jobDescriptionError !== ''}
                            helperText={jobDescriptionError !== '' ? jobDescriptionError : ''}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            type="number"
                            id="escrow_amount"
                            label="Escrow(HTZ Token) Amount *"
                            variant={isDisabled ? "standard" : "outlined"}
                            error={escrowAmountError !== ''}
                            helperText={escrowAmountError !== '' ? escrowAmountError : ''}
                            value={escrowAmount}
                            onChange={onChangeEscrowAmount}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <DatePicker
                            label="Completion Date *"
                            value={completionDate}
                            minDate={new Date()}
                            onChange={(newValue) => {
                                setCompletionDate(newValue);
                            }}
                            disabled={isDisabled}
                            renderInput={(params) => <TextField {...params} margin="normal" />}
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1 }}>
                        <FormControlLabel control={<Checkbox checked={tgrEarning} value={tgrEarning} onChange={onChangeTgrEarning} disabled={isDisabled} />} label="TGR Earning" />
                    </FormControl>
                    {row && row.status >= JOB_STATUS.JOB_SUBMITTED && (
                        <FormControl fullWidth sx={{ ml: 1 }}>
                            <TextField
                                id="submission"
                                label="Freelancer Submission"
                                variant={isDisabled ? "standard" : "outlined"}
                                value={agentsForJobs[row.index]?.submittedComment}
                                onChange={onChangeEscrowAmount}
                                InputProps={{ readOnly: isDisabled }}
                                size="small"
                            />
                        </FormControl>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCloseDialog()} disabled={loading}>Cancel</Button>
                {isConnected && address ? (
                    <>
                        {isOwner ? ownerButtons() : (
                            <>
                                {
                                    row && ([JOB_STATUS.VERIFYING, JOB_STATUS.VERIFYING_SUBMITTED, JOB_STATUS.DISPUTE_SUBMITTED].includes(row.status)) ? (
                                        <>
                                            {
                                                row.status === JOB_STATUS.DISPUTE_SUBMITTED && isLimitTimeOver(row.disputedAt, validationDuration) ? (
                                                    <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>
                                                        {
                                                            isValidating?"Validating...": "Validate"
                                                        }
                                                    </Button>
                                                ) : (
                                                    <>
                                                        {
                                                            row && !compareAddress(agentsForJobs[row.index]?.seller, address) && (
                                                                <>
                                                                    <Button onClick={() => handleApproveJob()} disabled={loading}>
                                                                        {
                                                                            isApproving?"Approving...": "Aprrove"
                                                                        }
                                                                    </Button>
                                                                    <Button onClick={() => handleDenyJob()} disabled={loading}>
                                                                        {
                                                                            isDenying?"Denying...": "Deny"
                                                                        }
                                                                    </Button>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            {
                                                (row && row.status === JOB_STATUS.JOB_SUBMITTED && isLimitTimeOver(row.submittedAt, submissionDisputeDuration)) ||
                                                (row && (row.status === JOB_STATUS.VERIFIED_POST || row.status === JOB_STATUS.VERIFIED_SUBMITTED || row.status === JOB_STATUS.VALIDATED_DISPUTE) && isTimeOver(row.validationPeriod)) ? (
                                                    <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>
                                                        {
                                                            isValidating?"Validating...": "Validate"
                                                        }
                                                    </Button>
                                                ) : (
                                                    <>
                                                        {row && row.tgrEarning && (
                                                            <Button onClick={() => handleDisputeJob()} disabled={loading}>
                                                                {
                                                                    isDisputing?"Disputing...": "Dispute"
                                                                }
                                                            </Button>
                                                        )}
                                                    </>
                                                    
                                                )
                                            }
                                        </>
                                        
                                    )
                                }
                            </>
                        )}
                    </>
                ) : (
                    openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                )}

            </DialogActions>
        </Dialog>
    )
}