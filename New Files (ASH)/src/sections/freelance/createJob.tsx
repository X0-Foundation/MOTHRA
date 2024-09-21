import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, MenuItem, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect, useCallback } from "react";
import ToastMessage from "@/components/toast";
import { Job, compareAddress, JOB_LEVELS, htzTokenAddress, taskContractAddress, JOB_STATUS, JOB_STATUS_LABEL, isLimitTimeOver, isTimeOver } from "@/states/common";

import { useAccount } from "wagmi";
import MainLayout from '@/layouts/main';
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAgentContract, useAgentsForJobs, useTaskContract } from "@/hooks";
import { Abi, Address, parseEther } from "viem";
import abiErc20 from "@/abi/abiErc20.json";
import abiTask from "@/abi/abiTask.json";
import useHtzToken from "@/hooks/useHtzToken";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { formatAddressWithMiddleDot } from "@/utils/formatAddress";

//---------------------------------
const taskContract = {
    address: taskContractAddress as Address,
    abi: abiTask,
};

//---------------------------------
export interface JobDialogProps {
    open: boolean,
    onClose: (value: string) => void;
    isCreating?: boolean,
    row: Job | undefined,
}

//-----------------------------------
const CreateJob = (props: JobDialogProps) => {
    const { onClose, open, isCreating, row } = props;

    const { openConnectModal } = useConnectModal();
    const theme = useTheme();
    const router = useRouter();
    
    // React Hook
    const { jobTypes, submissionDisputeDuration } = useTaskContract();
    const { agentsForJobs } = useAgentsForJobs();
    const { userLevel } = useAgentContract();
    const { address, isConnected } = useAccount();
    const { balance:htzTokenBalance, allowance:htzTokenAllowance } = useHtzToken();
    
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isDenying, setIsDenying] = useState(false);
    const [completionDate, setCompletionDate] = useState<Date | null>(new Date());
    const [isDisabled, setIsDisabled] = useState(false);
    const [jobLevel, setJobLevel] = useState(0);
    const [jobLevelError, setJobLevelError] = useState('')
    const [jobType, setJobType] = useState(0);
    const [jobTypeError, setJobTypeError] = useState('')
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobDescriptionError, setJobDescriptionError] = useState('');
    const [escrowAmount, setEscrowAmount] = useState('');
    const [escrowAmountError, setEscrowAmountError] = useState('');
    const [tgrEarning, setTgrEarning] = useState(false);
    // const [isDropping, setIsDropping] = useState(false);
    const [isClaiming, setIsClaiming] = useState(false);
    const [isReleasing, setIsReleasing] = useState(false);
    const [isDisputingSubmission, setIsDisputingSubmission] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const [profileAddress, setProfileAddress] = useState('');
  
    useEffect(() => {
        if(router.query && router.query.address) {
            setProfileAddress(typeof (router.query.address) !== undefined ? router.query.address.toString() : '');
        } else {
            setProfileAddress('');
        }
    }, [router.query])

    const initForm = () => {
        setJobLevel(0);
        setJobType(0);
        setJobTitle('');
        setJobDescription('');
        setEscrowAmount('');
        setCompletionDate(new Date());
        setTgrEarning(false);
    }

    const formValidator = () => {
        let res: boolean = false;
        if (jobLevel < 0) { setJobLevelError("Please select job level"); res = true; }
        if (jobType < 0) { setJobTypeError("Please select job type"); res = true; }
        if (jobTitle === '') { setJobTitleError("Please fill job title"); res = true; }
        if (jobDescription === '') { setJobDescriptionError("Please fill job description"); res = true; }
        if (escrowAmount === '') { setEscrowAmountError("Please fill escrow amount"); res = true; }
        // if (escrowAmount > htzAllowance) {setEscrowAmountError("HTZ Token Insufficient Balance");  res=true;}
        return res;
    }

    const notify = (type: string, message: string) => {
        ToastMessage({ type, message });
    }

    const onCloseDialog = useCallback(() => {
        onClose("");
    }, [onClose]);

    const handleProcess = async () => {
        if (row && row !== undefined) {
            if (compareAddress(row.buyer, address)) {
                return handleCloseJob();
            }
            // TODO: send a quate
            return openSendQuateDialog();
        }
        if(Number(escrowAmount) === 0 || escrowAmount === '') {
            notify('warning', "Please fill escrow amount");
            return null;
        }
        if (isApproved) {
            if (formValidator()) {
                return null;
            }
            
            return handleDefineJob();
        }
        return handleApprove();
    }

    // const handleDropJob = async () => {
    //     if(row && row !== undefined) {
    //         try {
    //             setIsDropping(true)
    //             const { request } = await prepareWriteContract({
    //                 address: taskContractAddress as Address,
    //                 abi: abiTask as Abi,
    //                 functionName: 'refundEscrowToBuyer',
    //                 args: [row.index], 
    //             })
    //             const {hash} = await writeContract(request);            
    //             await waitForTransaction({hash});

    //             setIsDropping(false)
    //             notify("success", "Successfully Dropped a Job");
    //             onCloseDialog();
    //         } catch (err) {
    //             console.error(err);
    //             notify("error", "Failed Dropping a Job")
    //             setIsDropping(false);
    //             onCloseDialog();
    //         }
    //     }
    // }

    const handleDefineJob = async () => {
        try {
            setLoading(true);
            const { request } = await prepareWriteContract({
                address: taskContractAddress as Address,
                abi: abiTask as Abi,
                functionName: 'defineJob',
                args: [jobType, jobLevel, jobTitle, jobDescription, tgrEarning, parseEther(escrowAmount), completionDate ? parseInt((completionDate.getTime() / 1000).toString(), 10) : parseInt((new Date().getTime() / 1000).toString(), 10)], 
            })        
            const {hash} = await writeContract(request);        
            await waitForTransaction({hash})

            setLoading(false);
            notify("success", "Successfully created");
            onCloseDialog();
        } catch (err) {
            setLoading(false)
            notify("error", "Failed creating")
        }
    }

    const handleApprove = async () => {
        try {
            setIsApproving(true);
            const { request } = await prepareWriteContract({
                address: htzTokenAddress as Address,
                abi: abiErc20 as Abi,
                functionName: 'approve',
                args: [taskContractAddress, parseEther(escrowAmount)],
            })        
            const {hash} = await writeContract(request);        
            await waitForTransaction({hash})

            setIsApproving(false);
            notify("success", "Successfully approved");
        } catch (err) {
            setIsApproving(false)
            console.error(err);
            notify("error", err.toString())
        }
    }

    const openSendQuateDialog = () => {
        onClose("open_send_quate");
    }

    const handleCloseJob = () => { }

    const handleClaim = useCallback(async (_jobId:number) => {
        try {
            setLoading(true);
            setIsClaiming(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'claimEscrow',
                args: [_jobId],
            });
        
            const { hash } = await writeContract(request);
        
            await waitForTransaction({hash});
            setLoading(false);
            setIsClaiming(false);
            notify("success", "Successfully Claimed");
            onCloseDialog()
        } catch (err) {
            setLoading(false);
            setIsClaiming(false);
            notify("error", "Failed Claiming");
        }
    },[onCloseDialog])

    const handleReleaseEscrow = useCallback(async (_jobId:number) => {
        if(!agentsForJobs[_jobId] || !agentsForJobs[_jobId].seller || agentsForJobs[_jobId].seller === '') {
            notify("error", "No freelancer");
            return;
        }
        try {
            setLoading(true);
            setIsReleasing(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'releaseEscrow',
                args: [_jobId],
            });
        
            const { hash } = await writeContract(request);
        
            await waitForTransaction({hash});
            setLoading(false);
            setIsReleasing(false);
            notify("success", "Successfully Released");
            onCloseDialog()
        } catch (err) {
            console.error(err);
            setLoading(false);
            setIsReleasing(false);
            notify("error", "Failed Releasing");
        }
    }, [agentsForJobs, onCloseDialog])

    const handleDisputeSubmission = useCallback(async (_jobId:number) => {
        if(!agentsForJobs[_jobId] || !agentsForJobs[_jobId].seller || agentsForJobs[_jobId].seller === '') {
            notify("error", "No freelancer");
            return;
        }
        try {
            setLoading(true);
            setIsDisputingSubmission(true);
            const { request } = await prepareWriteContract({
                ...taskContract,
                functionName: 'disputeSubmission',
                args: [_jobId],
            });
        
            const { hash } = await writeContract(request);
        
            await waitForTransaction({hash});
            setLoading(false);
            setIsDisputingSubmission(false);
            notify("success", "Successfully Disputed Submission");
            onCloseDialog()
        } catch (err) {
            console.error(err);
            setLoading(false);
            setIsDisputingSubmission(false);
            notify("error", "Failed Disputing Submission");
        }
    }, [agentsForJobs, onCloseDialog])

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

    const onChangeJobLevel = (e: any) => {
        setJobLevel(e.target.value);
        setJobLevelError('');
    }

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
        if (e.target.value > htzTokenBalance) {
            setEscrowAmountError('Your balance is not enough');
            return;
        }
        setEscrowAmount(e.target.value);
        setEscrowAmountError('')
    }

    const onChangeTgrEarning = (e: any) => {
        setTgrEarning(e.target.checked);
    }

    useEffect(() => {
        if(profileAddress !== '') {
            if(compareAddress(profileAddress, address)) {
                setIsGuest(false);
              } else {
                setIsGuest(true);
              }
        } else {
            setIsGuest(false)
        }
    }, [profileAddress, address]);

    useEffect(()=>{
        if(row) {
            if (compareAddress(row.buyer, address)) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [address, row])

    useEffect(() => {
        setIsDisabled(true)
        if (!isCreating && row) {
            setJobLevel(row.jobLevel);
            setJobType(row.jobType);
            setJobTitle(row.title);
            setJobDescription(row.description);
            setEscrowAmount(row.escrowAmount);
            setCompletionDate(new Date(row.completionTime * 1000));
            setTgrEarning(row.tgrEarning);
        } else {
            initForm();
            setIsDisabled(false);
        }
    }, [isCreating, row])

    useEffect(()=>{
        if(!isDisabled && Number(escrowAmount) > Number(htzTokenAllowance)) {
            setEscrowAmountError('HTZ Token Insufficient Balance');
            setIsApproved(false);
        } else {
            setEscrowAmountError('');
            setIsApproved(true);
        }
    }, [escrowAmount, htzTokenAllowance, isDisabled])

    return (
        <Dialog onClose={onCloseDialog} open={open}>
            {row ? (
                <DialogTitle>Job Description</DialogTitle>
            ) : (
                <DialogTitle>Create Job</DialogTitle>
            )}
            <DialogContent>
                {row ? (
                    <DialogContentText>You can see detailed description of job in here.</DialogContentText>
                ) : (
                    <DialogContentText>To create job, please full below fields in here.</DialogContentText>
                )}
                {row && row.status === JOB_STATUS.INPROGRESSING && (
                    <DialogContentText>Job is <span style={{color: 'white'}}>In Progressing</span> by <Link href={`/agency/profile?address=${agentsForJobs[row.index]?.seller}`} style={{textDecoration:'none', color:'rgb(118, 53, 220)', fontWeight: 'bold'}} target="_blank">{formatAddressWithMiddleDot(agentsForJobs[row.index]?.seller)}</Link></DialogContentText>
                )}
                {row && row.status >= JOB_STATUS.JOB_SUBMITTED && (
                    <DialogContentText>Job is <span style={{color: 'white'}}>{JOB_STATUS_LABEL[row.status]}</span> by <Link href={`/agency/profile?address=${agentsForJobs[row.index]?.seller}`} style={{textDecoration:'none', color:'rgb(118, 53, 220)', fontWeight: 'bold'}} target="_blank">{formatAddressWithMiddleDot(agentsForJobs[row.index]?.seller)}</Link></DialogContentText>
                )}
                {row && row.status < JOB_STATUS.POSTED && (
                    <DialogContentText>Job is <span style={{color: 'white'}}>{JOB_STATUS_LABEL[row.status]}</span></DialogContentText>
                )}
                <Box>
                    {!isOwner && (
                        <DialogContentText>Please click <Link href={`/agency/profile?address=${row?.buyer}`} style={{textDecoration:'none', color:`${theme.palette.primary.main}`, fontWeight: 'bold'}} target="_blank">Here</Link> to see Job Owner`s profile.</DialogContentText>
                    )}
                </Box>
                <Box
                    sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                >
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            select
                            id="job_level"
                            label="Job Level *"
                            variant={isDisabled ? "standard" : "outlined"}
                            defaultValue="0"
                            value={jobLevel}
                            onChange={onChangeJobLevel}
                            error={jobLevelError !== ''}
                            helperText={jobLevelError !== '' ? jobLevelError : ''}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        >
                            <MenuItem key={0} value="-1">Please select...</MenuItem>
                            {JOB_LEVELS.map((item, index) => (
                                <MenuItem key={index + 1} value={index}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            select
                            id="job_type"
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

                    {/* <FormControl fullWidth sx={{m:1}} variant="filled">
                        <InputLabel htmlFor="job_description">Job Description</InputLabel>
                        <FilledInput id="job_description"/>
                    </FormControl> */}
                    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                        <TextField
                            id="job_description"
                            label="Job Description *"
                            variant={isDisabled ? "standard" : "outlined"}
                            multiline rows={8}
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
                            helperText={escrowAmountError !== '' ? escrowAmountError : `Available Balance ${htzTokenAllowance}/${htzTokenBalance} HTZ`}
                            value={escrowAmount}
                            onChange={onChangeEscrowAmount}
                            InputProps={{ readOnly: isDisabled }}
                            size="small"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1, mt:0 }}>
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
                <Button onClick={() => onCloseDialog()} disabled={isApproving || loading}>Cancel</Button>
                {isOwner && row && (row.status === JOB_STATUS.INPROGRESSING || row.status === JOB_STATUS.POSTED) && (
                    // <Button onClick={() => {}} disabled={loading || isDropping}>{isDropping ? "Dropping..." : "Drop a Job"}</Button>
                    <Button>Drop a Job</Button>
                )}
                {/* isOwner && */ row && (row.status === JOB_STATUS.VERIFIED_POST || row.status === JOB_STATUS.VERIFIED_SUBMITTED) && isTimeOver(row.validationPeriod) && (
                    <Button onClick={() => handleValidateJob(row.index)} disabled={loading}>{isValidating?"Validating...": "Validate"}</Button>
                )}
                {isConnected && address ? (
                    <>
                        {
                            // isOwner && (
                                <>
                                    {isCreating && !row ? (
                                        <>
                                            <Button onClick={() => handleProcess()} disabled={isApproved || isApproving}>{isApproving ? "Approving..." : "Approve"}</Button>
                                            <Button onClick={() => handleProcess()} disabled={!isApproved || loading}>{loading ? "Creating..." : "Create"}</Button>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                row && row.status > JOB_STATUS.CREATED && row.status < JOB_STATUS.POSTED && (
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
                                            {
                                                row && !isGuest && !compareAddress(row.buyer, address) && row.status === JOB_STATUS.POSTED && (
                                                    <Button onClick={() => handleProcess()} disabled={loading}>{loading ? "Sending..." : "Send a quate"}</Button>
                                                )
                                            }
                                            {
                                                row && !isGuest && compareAddress(agentsForJobs[row.index]?.seller, address) && row.status === JOB_STATUS.COMPLETED1 && (
                                                    <Button onClick={()=>handleClaim(row.index)} disabled={loading || isClaiming}>{isClaiming ? "Claiming...":"Claim"}</Button>
                                                )
                                            }
                                            {
                                                row && !isGuest && compareAddress(row.buyer, address) && row.status === JOB_STATUS.JOB_SUBMITTED && (
                                                    <>
                                                        <Button onClick={()=>handleReleaseEscrow(row.index)} disabled={loading || isReleasing}>{isReleasing?"Releasing...":"Release Escrow"}</Button>
                                                        {!isLimitTimeOver(row.submittedAt, submissionDisputeDuration) && <Button onClick={()=>handleDisputeSubmission(row.index)} disabled={loading || isDisputingSubmission}>{isDisputingSubmission?"Disputing...":"Dispute Submission"}</Button>}
                                                    </>
                                                )
                                            }
                                        </>
                                    )}
                                </>
                            // )   
                        }
                        
                    </>
                ) : (
                    openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

CreateJob.getLayout = (page: React.ReactElement) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default CreateJob;