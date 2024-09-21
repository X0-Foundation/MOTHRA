/* eslint-disable import/no-cycle */
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {Address} from 'viem';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Tab, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
// import SortingSelecting from '../../sections/_examples/mui/table/sorting-selecting';
import { useAgentsForJobs, useTaskContract } from '@/hooks';
import { formatText, compareAddress, Job, JOB_STATUS, taskContractAddress, JOB_STATUS_LABEL } from '@/states/common';
import { formatAddressWithMiddleDot } from '@/utils/formatAddress';
import { StyledRoot } from '@/layouts/login/styles';
import LayoutXAgency from '@/layouts/main/freelance';
import MainLayout from '@/layouts/main';
import { TableHeadCustom, TableEmptyRows, emptyRows, TablePaginationCustom, useTable, getComparator } from '@/components/table';
import { MotionViewport } from '@/components/animate';
import Scrollbar from '@/components/scrollbar';
import ToastMessage from '@/components/toast';
import { ProfileDetails } from '@/sections/@dashboard/user/account';
import ViewSellers from '@/sections/freelance/viewSellers';
import CreateJob from '@/sections/freelance/createJob';
import { Block } from '@/sections/_examples/Block';
import abiTask from "@/abi/abiTask.json";
import palette from '@/theme/palette';
import SubmitJob from '@/sections/freelance/submitJob';

const taskContract = {
  address: taskContractAddress as Address,
  abi: abiTask,
};

const notify = (type: string, message: string) => {
  ToastMessage({type, message});
}

const TABLE_HEAD_JOBS_COMPLETED = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'escrowAmount', label: 'Price(HTZ)', align: 'center' },
  { id: 'seller', label: 'Seller', align: 'center' },
  { id: 'status', label: 'Job Status', align: 'center' },
  { id: 'review', label: 'Review', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

const TABLE_HEAD_JOBS = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'escrowAmount', label: 'Price(HTZ)', align: 'center' },
  { id: 'seller', label: 'Seller', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

const TABLE_HEAD_JOBS_POSTED = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'jobStatus', label: 'Status', align: 'center' },
  { id: 'escrowAmount', label: 'Price(HTZ)', align: 'center' },
  { id: 'seller', label: 'Seller', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

const TABS = [
  {
    value: 'completed_job',
    label: 'Completed Jobs',
  },
  {
    value: 'progress_job',
    label: 'In Progress Jobs',
  },
  {
    value: 'posted_job',
    label: 'Created Jobs',
  },
];

const XAgencyProfile = () => {
  const {isConnected} = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState('completed_job');  
  const [profileAddress, setProfileAddress] = useState(''); 
  
  useEffect(() => {
    if(router.query && router.query.address) {
      setProfileAddress(typeof (router.query.address) !== undefined ? router.query.address.toString() : '');
    } else {
      setProfileAddress('');
    }
  }, [router.query])

  return (
    <StyledRoot>
      <Container>
        <Box
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.400'),
          }}
        >
          <h2 className='agency-title' style={{color: `${palette('dark').primary.purple}`}}>Profile</h2>
        </Box>
        <Box
          sx={{ p: 2, mb: 3}}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
        >
          {isConnected ? (
            <>
              <ProfileDetails guestAddress={profileAddress}/>
              <Divider sx={{ mb: 3, mt: 10 }} />
              <TabContext value={currentTab}>
                <Box>
                  <TabList onChange={(event, newValue) => setCurrentTab(newValue)}>
                    {TABS.slice(0,5).map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        sx={{color: tab.value && `${palette('dark').primary.purple}`}}
                      />
                    ))}
                  </TabList>
                </Box>
                <Block sx={{padding: '2rem 0rem'}}>
                  <TabPanel value="completed_job" sx={{padding: '0'}}>
                    <CompletedJobList />
                  </TabPanel>
                  <TabPanel value="progress_job" sx={{padding: '0'}}>
                    <ProgressJobList />
                  </TabPanel>
                  <TabPanel value="posted_job" sx={{padding: '0'}}>
                    <PostedJobList />
                  </TabPanel>
                </Block>
              </TabContext>
            </>
          ) : (
            openConnectModal && <Button onClick={openConnectModal} sx={{display:'flex', margin:'auto'}}>Connect Wallet</Button>
          )}
        </Box>
      </Container>
    </StyledRoot>
  );
}

const CompletedJobList = () => {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({defaultOrderBy: 'calories',});

  const {address} = useAccount();
  const router = useRouter();

  const {jobList, jobTypes} = useTaskContract();
  const {agentsForJobs} = useAgentsForJobs();
  
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<Job[]>([]);
  const [mounted, setMounted] = useState(false);
  const [profileAddress, setProfileAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [openReview, setOpenReview] = useState(false)
  const [reviewJobId, setReviewJobId] = useState(-1);
  const [reviewMarker, setReviewMarker] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  // const [isDisputing, setIsDisputing] = useState(false);
  // const [isReleasing, setIsReleasing] = useState(false);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [detailRow, setDetailRow] = useState<Job>();

  // eslint-disable-next-line consistent-return
  const isReviewed = (_row:Job) => {
    if(_row) {
      if(compareAddress(_row.buyer, address) && _row.sellerReview > 0) return true;
      if(compareAddress(agentsForJobs[_row.index]?.seller, address) && _row.buyerReview > 0) return true;
      return false;
    }
  }

  useEffect(() => {
    if(router.query && router.query.address) {
      setProfileAddress(typeof (router.query.address) !== undefined ? router.query.address.toString() : '');
    } else {
      setProfileAddress('');
    }
  }, [router.query])

  useEffect(()=>{
    if(compareAddress(profileAddress, address)) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, profileAddress])

  const denseHeight = dense ? 24 : 54;

  const dataFiltered = CompletedFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    address: isOwner ? address : profileAddress
  });

  const onCloseDialog = () => {
    setOpenReview(false);
    setReviewJobId(-1);
    setReviewMarker(0);
    setReviewComment('');
    setIsDisabled(false);
  }


  const handleSetReview = useCallback(async () => {
      try {
        setLoading(true);
        const { request } = await prepareWriteContract({
            ...taskContract,
            functionName: compareAddress(jobList[reviewJobId].buyer, address) ? 'setSellerReview' : 'setBuyerReview',
            args: [reviewJobId, reviewMarker * 10, reviewComment],
        });    
        const { hash } = await writeContract(request);    
        await waitForTransaction({hash});

        setLoading(false);
        onCloseDialog();
        notify("success", "Successfully claimed");
      } catch (err) {
        console.error(err);
        setLoading(false);
        notify("error", "Failed claiming");
      }
    },
    [address, jobList, reviewComment, reviewJobId, reviewMarker],
  )

  const onChangeReviewMarker = (e:any) => {
    const val = e.target.value;
    if(Number(val) < 0) setReviewMarker(0);
    if(Number(val) > 5) setReviewMarker(5);
    else setReviewMarker(Number(parseFloat(val).toFixed(1)));
  }

  const onChangeReviewComment = (e:any) => {
    setReviewComment(e.target.value);
  }
  
  const onCloseViewDetail = () => {
    setOpenViewDetail(false);
  }

  const onOpenViewDetail = (row: Job) => {
    setDetailRow(row);
    setOpenViewDetail(true);
  }

  const handleOpenViewReview = (row:Job) => {
    setOpenReview(true);
    setIsDisabled(true);
    console.log(row);
    if(compareAddress(row.buyer, address)) {
      setReviewMarker(row.buyerReview / 10);
      setReviewComment(row.buyerReviewComment);
    }
    if(compareAddress(agentsForJobs[row.index].seller, address)) {
      setReviewMarker(row.sellerReview / 10)
      setReviewComment(row.sellerReviewComment)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(()=>{
    setTableData(jobList);
  }, [jobList]);

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_JOBS_COMPLETED}
                rowCount={tableData.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="left" sx={{ minWidth: 200, maxWidth: 400 }}>{formatText(row.title)}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{jobTypes[row.jobType]}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{row.escrowAmount}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        <Link href={`/agency/profile?address=${agentsForJobs[row.index]?.seller}`} style={{textDecoration:'none', color:`${palette('dark').primary.purple}`, fontWeight: 'bold'}} target="_blank">
                            {formatAddressWithMiddleDot(agentsForJobs[row.index]?.seller)}
                        </Link>
                      </TableCell>
                      <TableCell align="center" sx={{width: 'auto'}}>{JOB_STATUS_LABEL[row.status]}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        {isOwner && compareAddress(row.buyer, address) ? (
                          parseFloat((row.buyerReview / 10).toString()).toFixed(1)
                        ) : (
                          parseFloat((row.sellerReview / 10).toString()).toFixed(1)
                        )}
                      </TableCell>
                      <TableCell align="center" >
                        <Button onClick={()=>{onOpenViewDetail(row)}}>View</Button>
                        {isOwner && row.status === JOB_STATUS.DONE1 && (!isReviewed(row) ? (
                            <Button onClick={()=>{setOpenReview(true); setReviewJobId(row.index)}}>Review</Button>
                        ):(
                          <TableCell align="center" >
                            <Button onClick={()=>handleOpenViewReview(row)}>View Review</Button>
                          </TableCell>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {mounted && (
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          //
          // dense={dense}
          // onChangeDense={onChangeDense}
          />
        )}
      </Container>
      <CreateJob
          open={openViewDetail}
          onClose={onCloseViewDetail}
          row = {detailRow}
        />
      <Dialog open={openReview} onClose={onCloseDialog} fullWidth>
        <DialogTitle>Review</DialogTitle>

        <DialogContent>
          {!isDisabled && (<DialogContentText id="alert-dialog-description">
            You can set review for this job
          </DialogContentText>)}
        </DialogContent>
          <Box
              sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
          >
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <TextField
                  type='number'
                  id="review_marker"
                  label="Review Marker *"
                  value={reviewMarker}
                  onChange={onChangeReviewMarker}
                  size="small"
                  InputProps={{ readOnly: isDisabled }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <TextField
                  type='number'
                  id="review_comment"
                  label="Review Comment *"
                  multiline rows={4}
                  value={reviewComment}
                  onChange={onChangeReviewComment}
                  size="small"
                  InputProps={{ readOnly: isDisabled }}
              />
            </FormControl>
          </Box>
        <DialogActions>
          <Button onClick={onCloseDialog} disabled={loading}>
            Cancel
          </Button>
          {!isDisabled && (
            <Button onClick={()=>handleSetReview()} disabled={loading}>
              {loading ? 'Reviewing...': 'Review'}
            </Button>
          )}  
        </DialogActions>
      </Dialog>
    </StyledRoot>
  )
};

const ProgressJobList = () => {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({defaultOrderBy: 'calories',});
  const router = useRouter();
  const {address} = useAccount();
  
  const {jobList, jobTypes} = useTaskContract();
  const {agentsForJobs} = useAgentsForJobs();

  // const [loading, setLoading] = useState(false);
  // const [dropping, setDropping] = useState(false);
  const [tableData, setTableData] = useState<Job[]>([]);
  const [mounted, setMounted] = useState(false);
  const [profileAddress, setProfileAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);
  const [submitJobDialogOpen, setSubmitJobDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [detailRow, setDetailRow] = useState<Job>();

  const denseHeight = dense ? 24 : 54;

  const dataFiltered = ProgressFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    address: isOwner ? address : profileAddress
  });

  const handleOpenDetail = useCallback((row: Job) => {
    setIsCreating(false);
    setDetailRow(row);
    setCreateJobDialogOpen(true);
  }, [])

  const handleCreatJobDialogClose = useCallback(() => {
    setIsCreating(false);
    setCreateJobDialogOpen(false);
  },[])

  const handleOpenSubmitDialog = (row: Job) => {
    setDetailRow(row);
    setSubmitJobDialogOpen(true);
  }

  const onCloseSubmitDialog = () => {
    setSubmitJobDialogOpen(false);
  }

  // const handleCompleteJob = async (_jobId:number) => {
  //   try {
  //     setLoading(true);
  //     const { request } = await prepareWriteContract({
  //         ...taskContract,
  //         functionName: 'setJobInComplete',
  //         args: [_jobId],
  //     });
  
  //     const { hash } = await writeContract(request);
  
  //     await waitForTransaction({hash});
  //     setLoading(false);
  //     notify("success", "Successfully completed");
  //   } catch (err) {
  //     setLoading(false);
  //     notify("error", "Failed completing");
  //   }
  // }

  // const handleSubmitJob = async (_jobId:number) => {
  //   try {
  //     setLoading(true);
  //     const { request } = await prepareWriteContract({
  //         ...taskContract,
  //         functionName: 'submitJob',
  //         args: [_jobId],
  //     });
  
  //     const { hash } = await writeContract(request);
  
  //     await waitForTransaction({hash});
  //     setLoading(false);
  //     notify("success", "Successfully Submitted");
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //     notify("error", "Failed Submitting");
  //   }
  // }

  // const handleDropJob = async (_jobId:number) => {
  //   try {
  //     setDropping(true);
  //     const { request } = await prepareWriteContract({
  //         ...taskContract,
  //         functionName: 'refundEscrowToBuyer',
  //         args: [_jobId],
  //     });
  //     const { hash } = await writeContract(request);
  //     await waitForTransaction({hash});

  //     setDropping(false);
  //     notify("success", "Successfully Dropped");
  //   } catch (err) {
  //     setDropping(false);
  //     console.error(err)
  //     notify("error", "Failed dropping a job");
  //   }
  // }

  // const buttonAction = (_row:Job) => {
  //   if(_row && _row.status === JOB_STATUS.INPROGRESSING) {
  //     if((Date.now() / 1000) > _row.completionTime) {
  //       return (<>
  //         <Button onClick={() => handleCompleteJob(_row.index)} disabled={loading}>{loading?"Completing...":"Complete"}</Button>
  //         <Button onClick={() => handleDropJob(_row.index)} disabled={dropping}>{dropping?"Dropping...":"Drop a Job"}</Button>
  //       </>)
  //     } 
  //     return <Button onClick={() => handleCompleteJob(_row.index)} disabled={loading}>{loading?"Completing...":"Complete"}</Button>
  //   }
  //   return <Button>Action</Button>
  // }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(()=>{
    setTableData(jobList);
  }, [jobList]);

  useEffect(() => {
    if(router.query && router.query.address) {
      setProfileAddress(typeof (router.query.address) !== undefined ? router.query.address.toString() : '');
    } else {
      setProfileAddress('');
    }
  }, [router.query])

  useEffect(()=>{
    if(compareAddress(profileAddress, address)) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, profileAddress])

  return (
    <StyledRoot>
      <Container>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_JOBS}
                rowCount={tableData.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="left" sx={{ minWidth: 200, maxWidth: 400 }}>{formatText(row.title)}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{jobTypes[row.jobType]}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{row.escrowAmount}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        <Link href={`/agency/profile?address=${agentsForJobs[row.index]?.seller}`} style={{textDecoration:'none', color:`${palette('dark').primary.purple}`, fontWeight: 'bold'}} target="_blank">
                            {formatAddressWithMiddleDot(agentsForJobs[row.index]?.seller)}
                        </Link>
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        <Button onClick={()=> handleOpenDetail(row)}>View</Button>
                        {isOwner && compareAddress(agentsForJobs[row.index]?.seller, address) && (<Button onClick={() => handleOpenSubmitDialog(row)}>Submit a Job</Button>)
                        }
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {mounted && (
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          //
          // dense={dense}
          // onChangeDense={onChangeDense}
          />
        )}
      </Container>
      <CreateJob
          open={createJobDialogOpen}
          onClose={handleCreatJobDialogClose}
          isCreating={isCreating}
          row = {detailRow}
        />
      <SubmitJob
        open={submitJobDialogOpen}
        onClose={onCloseSubmitDialog}
        row={detailRow}
      />
    </StyledRoot>
  )
};

const PostedJobList = () => {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({defaultOrderBy: 'calories',});

  const {address} = useAccount();
  const {jobList, jobTypes} = useTaskContract();
  const {agentsForJobs} = useAgentsForJobs();
  const router = useRouter();

  const [tableData, setTableData] = useState<Job[]>([]);
  const [mounted, setMounted] = useState(false);
  const [profileAddress, setProfileAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);
  const [detailRow, setDetailRow] = useState<Job>();
  const [viewSellersDialogOpen, setViewSellersDialogOpen] = useState(false);

  const denseHeight = dense ? 24 : 54;

  const dataFiltered = PostFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    address: isOwner ? address : profileAddress
  });
  
  const getBidderCount = (_jobId: number) => {
    try {
      if(agentsForJobs.length > 0 ) {
        return agentsForJobs[_jobId].bidders.length;
      } 
      return 0;
    } catch(e) {
      return 0;
    }
  }

  const handleOpenDetail = useCallback((row: Job) => {
    setIsCreating(false);
    setDetailRow(row);
    setCreateJobDialogOpen(true);
  }, [])

  const handleCreatJobDialogClose = useCallback((code:string) => {
    setIsCreating(false);
    setCreateJobDialogOpen(false);
  },[])

  const handleViewSellerDialogClose = useCallback(() => {
    setViewSellersDialogOpen(false);
  },[])

  const handleViewSellers = useCallback((row: Job) => {
    setDetailRow(row);
    setViewSellersDialogOpen(true);
  }, [])

  const buttonAction = (row:Job) => (
    <>
      {/* <Button onClick={()=> handleOpenDetail(row)}>View</Button> */}
      {row && row.status < JOB_STATUS.INPROGRESSING && <Button onClick={()=> handleViewSellers(row)} disabled={row.status !== JOB_STATUS.POSTED}>View Seller</Button>}
    </>)

  useEffect(() => {
    if(router.query && router.query.address) {
      setProfileAddress(typeof (router.query.address) !== undefined ? router.query.address.toString() : '');
    } else {
      setProfileAddress('');
    }
  }, [router.query])

  useEffect(()=>{
    if(compareAddress(profileAddress, address)) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [address, profileAddress])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(()=>{
    setTableData(jobList);
  }, [jobList]);

  return (
    <StyledRoot>
      <Container>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_JOBS_POSTED}
                rowCount={tableData.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="left" sx={{ minWidth: 200, maxWidth: 400 }}>{formatText(row.title)}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{jobTypes[row.jobType]}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{JOB_STATUS_LABEL[row.status]}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{row.escrowAmount}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>{getBidderCount(row.index)}</TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        <Button onClick={()=> handleOpenDetail(row)}>View</Button>
                        {isOwner && compareAddress(row.buyer, address) && (
                          <>
                            {buttonAction(row)}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {mounted && (
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          //
          // dense={dense}
          // onChangeDense={onChangeDense}
          />
        )}
      </Container>
      <CreateJob
          open={createJobDialogOpen}
          onClose={handleCreatJobDialogClose}
          isCreating={isCreating}
          row = {detailRow}
        />
      <ViewSellers 
          open={viewSellersDialogOpen}
          onClose={handleViewSellerDialogClose}
          row={detailRow}
        />
    </StyledRoot>
  )
};

function CompletedFilter({inputData,comparator,address}: {inputData: Job[]; comparator: (a: any, b: any) => number; address:string|undefined;}) {
  // const {address} = useAccount();
  const {agentsForJobs} = useAgentsForJobs();
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  const filteredData = stabilizedThis.filter(
    (el) => 
      ((el[0].status >= JOB_STATUS.COMPLETED1 || (!el[0].tgrEarning && el[0].status === JOB_STATUS.JOB_SUBMITTED)) && (compareAddress(agentsForJobs[el[0].index]?.seller, address)))
  )
  inputData = filteredData.map((el) => el[0]);

  return inputData;
}

function ProgressFilter({inputData,comparator,address}: {inputData: Job[]; comparator: (a: any, b: any) => number;address:string|undefined}) {
  // const {address} = useAccount();
  const {agentsForJobs} = useAgentsForJobs();

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  const filteredData = stabilizedThis.filter((el) => el[0].status === JOB_STATUS.INPROGRESSING && (compareAddress(el[0].buyer, address) || compareAddress(agentsForJobs[el[0].index].seller, address)))

  inputData = filteredData.map((el) => el[0]);

  return inputData;
}

function PostFilter({inputData,comparator,address}: {inputData: Job[]; comparator: (a: any, b: any) => number;address:string|undefined}) {
  // const {address} = useAccount();
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  const filteredData = stabilizedThis.filter((el) => el[0].status >= JOB_STATUS.CREATED && (compareAddress(el[0].buyer, address)))

  inputData = filteredData.map((el) => el[0]);

  return inputData;
}

XAgencyProfile.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>Profile | Agency</title>
    </Head>
    <LayoutXAgency>{page}</LayoutXAgency>
  </MainLayout>
);

export default XAgencyProfile;
