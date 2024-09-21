/* eslint-disable react-hooks/exhaustive-deps */
// @mui
import {
  Box,
  Grid,
  Card,
  Divider,
  Button,
  LinearProgress,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  TextField,
  FormControl,
  Paper,
  Rating,
  styled,
  List,
  ListItemButton,
  ListItemText,
  Avatar
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { formatAddressWithMiddleDot } from '@/utils/formatAddress';
import palette from '@/theme/palette';
import ToastMessage from '@/components/toast';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead } from 'wagmi';
import { Abi, Address, formatEther, parseEther } from 'viem';
import { useAgentContract, useAgentsForJobs, useTaskContract } from '@/hooks';
import useTgrToken from '@/hooks/useTgrToken';
import useHtzToken from '@/hooks/useHtzToken';
import { JOB_STATUS, Job, agentContractAddress, tgrTokenAddress, compareAddress, formatDate, htzTokenAddress } from '@/states/common';
import abiErc20 from '@/abi/abiErc20.json';
import abiAgent from "@/abi/abiAgent.json";
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { publicClient } from '@/viemClient';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EvmChain, NftscanEvm } from "nftscan-api";
import Image from '@/components/image';

// components
const tgrTokenContract = {
  address: tgrTokenAddress as Address,
  abi: abiErc20 as Abi,
};

const notify = (type: string, message: string) => {
    ToastMessage({type, message});
}

interface Props {
  guestAddress:string
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
}));

const nftConfig = {
  apiKey: "1WdUbax8Ybf8z1iJa7hcdFfg",
  chain: EvmChain.FANTOM,
};


export default function ProfileDetails(props:Props) {
  const {guestAddress} = props;
  const [nftLogoes, setNftLogoes] = useState<any>();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [open, setOpen] = useState(false);
  const [openStake, setOpenStake] = useState(false);
  const [openUnStake, setOpenUnStake] = useState(false);
  const [openBurn, setOpenBurn] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unStakeAmount, setUnStakeAmount] = useState(0);
  const [burnAmount, setBurnAmount] = useState(0);
  const [completedJobCount, setCompletedJobCount] = useState(0);
  const [progressJobCount, setProgressJobCount] = useState(0);
  const [postedJobCount, setPostedJobCount] = useState(0);
  const [userLevelMaxAmount, setUserLevelMaxAmount] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [guestLevel, setGuestLevel] = useState(0);
  const [guestTgrStakedTokenBalance, setGuestTgrStakedTokenBalacen] = useState(0);
  const [htzTokenBalance, setHtzTokenBalance] = useState(0);
  const [clientReview, setClientReview] = useState(0);
  const [freelancerReview, setFreelancerReview] = useState(0);
  const { openConnectModal } = useConnectModal();
  const {address, isConnected} = useAccount();
  const {jobList} = useTaskContract();
  const {userLevel, userTgrStakedTokenBalance, lockedTime, maxLevel } = useAgentContract();
  const {agentsForJobs} = useAgentsForJobs();
  const {allowance:tgrTokenAllowance, balance: tgrTokenBalance} = useTgrToken();
  const {balance} = useHtzToken();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userName, setUserName] = useState();
  const [imgUri, setImgUri] = useState();

  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: agentContractAddress as Address,
    abi: abiAgent as Abi,
    functionName: 'getMaxAmountOfLevel',
    args: [Number(userLevel) + 1 > Number(maxLevel) ? maxLevel : userLevel + 1],
    watch: true
  })

  const getReview = (_address:string) => {
    let _clientReview = 0; 
    let _clientReviewCnt = 0;
    let _freelancerReview = 0;
    let _freelancerReviewCnt = 0;
    jobList.forEach((el:Job) => {
      if(compareAddress(el.buyer, _address) && el.buyerReview > 0) {
        _clientReview += el.buyerReview / 10;
        _clientReviewCnt += 1;
      } else if(compareAddress(agentsForJobs[el.index]?.seller, _address) && el.sellerReview > 0) {
        _freelancerReview += el.sellerReview / 10;
        _freelancerReviewCnt += 1;
      }
    })
    if(_clientReview > 0) {
      setClientReview(Number(parseFloat((_clientReview/_clientReviewCnt).toString()).toFixed(1)))
    } else setClientReview(0);
    if(_freelancerReview > 0) {
      setFreelancerReview(Number(parseFloat((_freelancerReview/_freelancerReviewCnt).toString()).toFixed(1)))
    } else setFreelancerReview(0);
  }

  useEffect(()=>{
    if(!isError && !isLoading && isSuccess && data) {
      setUserLevelMaxAmount(Number(formatEther(data as bigint)));
    }
  }, [data, isError, isSuccess, isLoading])

  useEffect(()=>{
    if(compareAddress(guestAddress, address)) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, guestAddress])

  useEffect(() => {
    if(guestAddress) {
      getGuestInfo(guestAddress);
    }
  }, [guestAddress, agentsForJobs])

  useEffect(()=>{
    if(isOwner) {
      const res = jobList.filter(
        (el:Job) => 
        ((el.status >= JOB_STATUS.COMPLETED1 || (!el.tgrEarning && el.status === JOB_STATUS.JOB_SUBMITTED)) && (compareAddress(el.buyer, address) || compareAddress(agentsForJobs[el.index]?.seller, address)))
        )
      setCompletedJobCount(res.length);
      const res1 = jobList.filter(
        (el:Job) => el.status === JOB_STATUS.INPROGRESSING && (compareAddress(el.buyer, address) || compareAddress(agentsForJobs[el.index]?.seller, address))
        )
      setProgressJobCount(res1.length)
      const res2 = jobList.filter(
        (el:Job) => 
          el.status >= JOB_STATUS.POSTED && (compareAddress(el.buyer, address))
        )
      setPostedJobCount(res2.length)
      if(address) getReview(address)
    }
  }, [address, agentsForJobs, isOwner, jobList])
  // get HTZ Token Balance
  useEffect(() => {
    setHtzTokenBalance(balance);
  }, [balance])
  // Get Guest Info
  const getGuestInfo = async (_guest:any) => {
    if(!_guest || _guest === '') return;

    getReview(_guest);
    
    try {
      const res = await publicClient?.readContract({
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'getLevelOfAgent',
        args: [_guest],
      })

      setGuestLevel(Number(res as bigint));
    } catch (e) {
      console.error(e);
    }
    try {
      const res1 = await publicClient?.readContract({
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'getStakedAmountOfAgent',
        args: [_guest],
      })

      setGuestTgrStakedTokenBalacen(Number(formatEther(res1 as bigint)));
    } catch (e) {
      console.error(e);
    }
    try {
      const res3 = await publicClient?.readContract({
        address: htzTokenAddress as Address,
        abi: abiErc20 as Abi,
        functionName: 'balanceOf',
        args: [_guest],
      })

      setHtzTokenBalance(Number(formatEther(res3 as bigint)))
    } catch (e) {
      console.error(e);
    }
    try {
      const res4 = await publicClient?.readContract({
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'poolStakers',
        args: [_guest],
      })
      const tempData: any = res4;
      setUserName(tempData[0]);
      setImgUri(tempData[1]);
    } catch (e) {
      console.error(e);
    }
  
      const ret1 = jobList.filter(
        (el:Job) => 
        ((el.status >= JOB_STATUS.COMPLETED1 || (!el.tgrEarning && el.status === JOB_STATUS.JOB_SUBMITTED)) && (compareAddress(el.buyer, address) || compareAddress(agentsForJobs[el.index]?.seller, address)))
        )
      const ret2 = jobList.filter(
        (el:Job) => el.status === JOB_STATUS.INPROGRESSING && (compareAddress(el.buyer, address) || compareAddress(agentsForJobs[el.index]?.seller, address))
        )
      const ret3 = jobList.filter(
          (el:Job) => 
          el.status >= JOB_STATUS.POSTED && (compareAddress(el.buyer, guestAddress))
          )
      
      setCompletedJobCount(ret1.length)
      setProgressJobCount(ret2.length)
      setPostedJobCount(ret3.length)
  }
  // Get NFTs From Wallet
  const getNFTsFromWallet = useCallback(()=>{
    const temp_address: any = address;
    const evm = new NftscanEvm(nftConfig);
    evm.asset.getAllAssets(temp_address).then((result) => {
      setNftLogoes(result);
      console.log('NFT Logoes: ', nftLogoes);
    }).catch((error) => {
      console.log(error);
    })
  },[ nftLogoes, setNftLogoes])

  // Open Melt TGR Dialog
  const handleClickOpen = () => {
    setOpenBurn(true);
  };
  // Open Edit Profile Dialog
  const handleEditProfile = () => {
    getNFTsFromWallet();
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenStake(false);
    setOpenUnStake(false);
    setOpenBurn(false);
    setStakeAmount(0);
    setUnStakeAmount(0);
    setBurnAmount(0);
    setOpenEdit(false);
  };

  const handleStake = async () => {
    if(Number(stakeAmount) === 0) {
      notify("warning", "Please fill out stake amount");
      return;
    }
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
          address: agentContractAddress as Address,
          abi: abiAgent as Abi,
          functionName: 'deposit',
          args: [parseEther(stakeAmount.toString())],
      });  
      const { hash } = await writeContract(request);  
      await waitForTransaction({hash});

      setLoading(false);
      notify("success", "Successfully staked");
      handleClose();     
    } catch (err) {
        setLoading(false);
        console.error(err);
        notify("error", "Failed staking");
    }
  }

  const handleUnStake = async () => {
    if(Number(unStakeAmount) === 0) {
      notify("warning", "Please fill out unStake amount");
      return;
    }
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
          address: agentContractAddress as Address,
          abi: abiAgent as Abi,
          functionName: 'withdraw',
          args: [parseEther(unStakeAmount.toString())],
      });  
      const { hash } = await writeContract(request);  
      await waitForTransaction({hash});

      setLoading(false);
      notify("success", "Successfully unstaked");
      handleClose();     
    } catch (err) {
        setLoading(false);
        console.error(err);
        notify("error", "Failed unstaking");
    }
  }

  const handleBurn = async () => {
    if(Number(burnAmount) === 0) {
      notify("warning", "Please fill out burn amount");
      return;
    }
    try {
      setLoading(true);
      const { request } = await prepareWriteContract({
          address: tgrTokenAddress as Address,
          abi: abiErc20 as Abi,
          functionName: 'burn',
          args: [parseEther(burnAmount.toString())],
      });  
      const { hash } = await writeContract(request);  
      await waitForTransaction({hash});

      setLoading(false);
      notify("success", "Successfully burned");
      handleClose();     
    } catch (err) {
        setLoading(false);
        console.error(err);
        notify("error", "Failed burning");
    }
  }

   const handleLogoItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  // Save img_uri, contract_name to contract
  const handleSaveLogo = async () => {
    try {
      setLoading(true);
      const {request} = await prepareWriteContract({
        address: agentContractAddress as Address,
        abi: abiAgent as Abi,
        functionName: 'saveNameAndLogo',
        args: [nftLogoes[selectedIndex].contract_name, nftLogoes[selectedIndex].assets[0].image_uri]
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({hash});
      setLoading(false);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  const handleTgrApprove = async () => {
    try {
      setIsApproving(true);
      const { request } = await prepareWriteContract({
          ...tgrTokenContract,
          functionName: 'approve',
          args: [agentContractAddress, parseEther(stakeAmount.toString())],
      });  
      const { hash } = await writeContract(request);  
      await waitForTransaction({hash});

      setIsApproving(false);
      notify("success", "Successfully approved");
    } catch (err) {
        setIsApproving(false);
        console.error(err);
        notify("error", "Failed approving");
    }
  }

  const onChangeStakeAmount = async (e:any) => {
    if(e.target.value < 0) setStakeAmount(0)
    else if(e.target.value > tgrTokenBalance) setStakeAmount(tgrTokenBalance);
    else {
      setStakeAmount(e.target.value);
    }
  }

  const onChangeUnStakeAmount = async (e:any) => {
    if(e.target.value < 0) setUnStakeAmount(0)
    else if(e.target.value > userTgrStakedTokenBalance) setUnStakeAmount(userTgrStakedTokenBalance);
    else setUnStakeAmount(e.target.value);
  }

  const onChangeBurnAmount = async (e:any) => {
    if(e.target.value < 0) setBurnAmount(0)
    else if(e.target.value > userTgrStakedTokenBalance) setBurnAmount(userTgrStakedTokenBalance);
    else setBurnAmount(e.target.value);
  }

  useEffect(()=>{
    if (Number(stakeAmount) > Number(tgrTokenAllowance)) {
      setIsApproved(false);
    } else {
      setIsApproved(true);
    }
  }, [stakeAmount, tgrTokenAllowance])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ py: 2, px: 2, textAlign: 'center' }}>
              <Image
                alt="avatar"
                src={imgUri ? `https://ipfs.io/ipfs/${imgUri}` : "/assets/images/home/carousel_3.png"}
                sx={{ borderRadius: 1 }}
              />

          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>Name</Item>
                </Grid>
                <Grid item xs={6}>
                  {
                    userName && isOwner ?
                    <Item>{formatAddressWithMiddleDot(userName)}</Item>
                      : <Item>{formatAddressWithMiddleDot(guestAddress || address)}</Item>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Item>Level</Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>{isOwner ? userLevel : guestLevel}</Item>
                </Grid>
                {isOwner ? (
                  <>
                    <Grid item xs={6}> 
                      <Item>Rank</Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex' }}>
                        <span style={{color:`${palette('dark').primary.purple}`}}>0</span>
                        <LinearProgress
                          key="primary"
                          color="primary"
                          value={userLevelMaxAmount > 0 ? 100 * userTgrStakedTokenBalance/userLevelMaxAmount : 0}
                          variant="determinate"
                          sx={{ width: 1, height: 10, mx: 2, mt: 1 }}
                        />
                        <span style={{color:`${palette('dark').primary.purple}`}}>{userLevelMaxAmount}</span>
                      </Box>
                      <span style={{display:'flex', justifyContent:'end', marginRight:'2rem'}}>{userTgrStakedTokenBalance}</span>
                    </Grid>
                  </>
                ):(<>
                  <Grid item xs={6}>TGR Token</Grid>
                  <Grid item xs={6}>{guestTgrStakedTokenBalance}</Grid>
                </>)}
                <Grid item xs={6} />
                <Grid item xs={6}>
                  {isOwner && (
                    isConnected ? (
                      <Box sx={{ display: 'block' }}>
                        <Button variant="soft" sx={{ mr: 3 }} onClick={()=>setOpenStake(true)}>
                          Stake
                        </Button>
                        <Button variant="outlined" onClick={()=>setOpenUnStake(true)}>
                          UnStake
                        </Button>
                      </Box>
                    ) : (
                      openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                    )
                  )}
                </Grid>
                <Grid item xs={6}><Item>Guilds</Item></Grid>
                <Grid item xs={6}><Item>{userLevel + 1 > maxLevel ? `Max Level` : `Coming In Version ${userLevel + 1}`}</Item></Grid>
                <Grid item xs={6}><Item>Completed Jobs</Item></Grid>
                <Grid item xs={6}><Item>{completedJobCount}</Item></Grid>
                <Grid item xs={6}><Item>In Progress Jobs</Item></Grid>
                <Grid item xs={6}><Item>{progressJobCount}</Item></Grid>
                <Grid item xs={6}><Item>Posted Jobs</Item></Grid>
                <Grid item xs={6}><Item>{postedJobCount}</Item></Grid>
                <Grid item xs={6}><Item>HTZ Earned</Item></Grid>
                <Grid item xs={6}><Item>{htzTokenBalance}</Item></Grid>
                <Grid item xs={6}><Item>Client Review</Item></Grid>
                <Grid item xs={6}><Rating name="half-rating-read" value={clientReview} precision={0.5} readOnly /></Grid>
                <Grid item xs={6}><Item>Freelancer Review</Item></Grid>
                <Grid item xs={6}><Rating name="half-rating-read" value={freelancerReview} precision={0.5} readOnly /></Grid>
              </Grid>

              {isOwner && (
                isConnected ? (
                  <>
                    <Divider />

                    <Box
                      rowGap={3}
                      columnGap={2}
                      display="grid"
                      gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(3, 1fr)',
                      }}
                    >
                      <Button variant="contained" sx={{backgroundColor: `${palette('dark').primary.neonGreen}`, color: 'white'}} size="large" onClick={handleClickOpen}>
                        Melt TGR
                      </Button>
                      <Button variant="contained" sx={{backgroundColor: `${palette('dark').primary.neonGreen}`, color: 'white'}} onClick={handleEditProfile}>
                        Edit Profile
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Wanna Continue ?</DialogTitle>

                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Need to put some text here for warning
                          </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                          <Button onClick={handleClose} autoFocus>
                            Continue
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={openStake} onClose={handleClose} fullWidth>
                        <DialogTitle>TGR Token Stake</DialogTitle>

                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Stakable amount of TGR token is: &nbsp; <span style={{color:'white'}}>{tgrTokenAllowance}</span> / <span style={{color:'white'}}>{tgrTokenBalance}</span>
                          </DialogContentText>
                        </DialogContent>
                          <Box
                              sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                          >
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                              <TextField
                                  type='number'
                                  id="stake_amount"
                                  label="Stake Amount *"
                                  value={stakeAmount}
                                  onChange={onChangeStakeAmount}
                                  size="small"
                              />
                            </FormControl>
                          </Box>
                        <DialogActions>
                          <Button onClick={handleClose} disabled={isApproving || loading}>
                            Cancel
                          </Button>
                            <Button onClick={handleTgrApprove} disabled={isApproved || isApproving}>
                              {isApproving ? 'Approving...': 'Approve'}
                            </Button>
                            <Button onClick={handleStake} disabled={!isApproved || loading}>
                              {loading ? 'Staking...': 'Stake'}
                            </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog open={openUnStake} onClose={handleClose} fullWidth>
                        <DialogTitle>
                          TGR Tokens UnStake
                          <p style={{fontSize:'14px', fontWeight:'100', color:'#919EAB', marginBottom: 0}}>Staked tokens will be locked until <span style={{color:'white'}}>{formatDate(lockedTime)}</span></p>
                        </DialogTitle>

                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            <p>Staked TGR token is <span style={{color:'white'}}>{userTgrStakedTokenBalance}</span></p>
                          </DialogContentText>
                        </DialogContent>
                          <Box
                              sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                          >
                            <FormControl fullWidth sx={{ mx: 1 }} variant="filled">
                              <TextField
                                  type='number'
                                  id="unstake_amount"
                                  label="UnStake Amount *"
                                  size="small"
                                  value={unStakeAmount}
                                  onChange={onChangeUnStakeAmount}
                              />
                            </FormControl>
                          </Box>
                        <DialogActions>
                          <Button onClick={handleClose} disabled={loading}>
                            Cancel
                          </Button>
                            <Button onClick={handleUnStake} disabled={loading}>
                              {loading ? 'UnStaking...': 'UnStake'}
                            </Button>
                        </DialogActions>
                      </Dialog>
                      {/* Melt TGR Dialog */}
                      <Dialog open={openBurn} onClose={handleClose} fullWidth>
                        <DialogTitle>
                          TGR Tokens Melt
                        </DialogTitle>

                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            <p>TGR tokens is <span style={{color:'white'}}>{tgrTokenBalance}</span></p>
                          </DialogContentText>
                        </DialogContent>
                          <Box
                              sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                          >
                            <FormControl fullWidth sx={{ mx: 1 }} variant="filled">
                              <TextField
                                  type='number'
                                  id="melt_amount"
                                  label="Melt Amount *"
                                  size="small"
                                  value={burnAmount}
                                  onChange={onChangeBurnAmount}
                              />
                            </FormControl>
                          </Box>
                        <DialogActions>
                          <Button onClick={handleClose} disabled={loading}>
                            Cancel
                          </Button>
                            <Button onClick={handleBurn} disabled={loading}>
                              {loading ? 'Melting...': 'Melt TGR'}
                            </Button>
                        </DialogActions>
                      </Dialog>
                      {/* Edit Profile Dialog */}
                      <Dialog open={openEdit} onClose={handleClose} fullWidth>
                        <DialogTitle>
                          Choose your NFT Logo
                        </DialogTitle>
                        {
                          nftLogoes && (
                          <DialogContent>
                            <List component="nav" aria-label="main mailbox folders">                          
                            {
                              nftLogoes.map((element: { assets: any; logo_url: string | undefined; contract_name: string | undefined }, index: number ) => (
                                <ListItemButton selected={selectedIndex === index} onClick={(event) => handleLogoItemClick(event, index)}>
                                  <Avatar>
                                    <Image src={element.assets ? `https://ipfs.io/ipfs/${element.assets[0].image_uri}` : '/assets/images/home/carousel_3.png'} key={index}/>
                                  </Avatar>
                                  <ListItemText primary={element.contract_name} sx={{px: 2}} />
                                </ListItemButton>
                              ))
                            }
                            </List>
                          </DialogContent>
                          )
                        }
                          <Box
                              sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
                          >
                            <Image />
                          </Box>
                        <DialogActions>
                          <Button onClick={handleClose} disabled={loading}>
                            Cancel
                          </Button>
                            <Button onClick={handleSaveLogo} disabled={loading}>
                              {loading ? 'Saving...': 'Choose'}
                            </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </>
                ) : (
                  openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button>
                )
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* openConnectModal && <Button onClick={openConnectModal}>Connect Wallet</Button> */}
    </>
  ); 
}
