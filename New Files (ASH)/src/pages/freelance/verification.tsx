/* eslint-disable import/no-cycle */
import { JOB_STATUS, JOB_STATUS_LABEL, Job, Vote, formatText, isLimitTimeOver } from '@/states/common';
import { StyledRoot } from '@/layouts/login/styles';
import { Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { TableEmptyRows, TableHeadCustom, TablePaginationCustom, emptyRows, getComparator, useTable } from '@/components/table';
import Scrollbar from '@/components/scrollbar';
import { MotionViewport } from '@/components/animate';
import { useCallback, useEffect, useState } from 'react';
import LayoutXAgency from '@/layouts/main/freelance';
import MainLayout from '@/layouts/main';
// import { eth } from '@/states/eth';
import VerificationJob from '@/sections/freelance/verificationJob';
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

import {useAgentsForJobs, useTaskContract} from '@/hooks';
import Head from 'next/head';
import palette from '@/theme/palette';

//---------------------------------
const TABLE_HEAD_JOBS = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'jobStatus', label: 'Job Status', align: 'center' },
  { id: 'jobLevel', label: 'Job Level', align: 'center' },
  { id: 'escrowAmount', label: 'Price', align: 'center' },
  { id: 'verification', label: 'Verification', align: 'center' },
  { id: 'details', label: 'Details', align: 'center' },
];

//-------------------------------------------

//-------------------------------------------
const XAgencyVerficiation = () => {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({ defaultOrderBy: 'calories', });

  // const jobTypes = useJobTypes();
  // const jobList = useJobList();
  const { jobList, jobTypes, submissionDisputeDuration } = useTaskContract();
  const {agentsForJobs} = useAgentsForJobs();

  const [detailRow, setDetailRow] = useState<Job>();
  const [mounted, setMounted] = useState(false);
  const [tableData, setTableData] = useState<Job[]>([]);
  const [verificationJobDialogOpen, setVerificationJobDialogOpen] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const denseHeight = dense ? 24 : 54;

  const dataFiltered = applyFilter({
    inputData: tableData,
    searchParam,
    comparator: getComparator(order, orderBy),
    limitTime: submissionDisputeDuration
  });

  const onCloseDialog = useCallback(() => {
    setVerificationJobDialogOpen(false);
  }, [])

  const onOpenDialgo = useCallback((row: Job) => {
    setDetailRow(row);
    setVerificationJobDialogOpen(true);
  }, [])

  const getVerificationStatus = (_jobId:number) => {
    try {
      if(agentsForJobs.length > 0) {
          let _isApproved = 0; 
          let _isDenied = 0;
          agentsForJobs[_jobId].validators.forEach((item: Vote) => {
            if (item.result) _isApproved += 1;
            else _isDenied += 1;
          })
          return _isApproved > _isDenied ? 
            (<>{_isApproved} / {_isDenied}&nbsp;&nbsp;<FaRegThumbsUp color="green" /></>) : 
            (<>{_isApproved} / {_isDenied}&nbsp;&nbsp;<FaRegThumbsDown color="red" style={{verticalAlign:'middle'}} /></>);
      }
      return '0 / 0';
    } catch (e) {
      return '0 / 0'
    }
  }

  useEffect(() => {
    setMounted(true)
    setDetailRow(undefined);
  }, [])

  useEffect(() => {
    setTableData(jobList);
  }, [jobList, submissionDisputeDuration]);

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.400'),
          }}
        >
          <h2 className='agency-title' style={{color: `${palette('dark').primary.purple}`}}>Verfication Jobs</h2>
          <p className='agency-description'>You can view verifiable jobs in here, and you can approve or deny verifiable jobs. If job passes verification it will become available after 48 hours, and if the verification fails and job isn`t posted then the agent attempting to post will be slashed and 25% of the HTZ locked for the job will be burned.</p>
        </Box>
        <Box
          sx={{ p: 2, mb: 3, display: 'grid', gap: 2 }}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
        >
          <TextField label="Search" type="search" size="small" onChange={(e) => setSearchParam(e.target.value)} />
        </Box>
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
                      <TableCell sx={{ minWidth: 200, maxWidth: 400 }}>{formatText(row.title)}</TableCell>
                      <TableCell align="center">{jobTypes[row.jobType]}</TableCell>
                      <TableCell align="center">{JOB_STATUS_LABEL[row.status]}</TableCell>
                      <TableCell align="center">{row.jobLevel}</TableCell>
                      <TableCell align="center">{row.escrowAmount}</TableCell>
                      <TableCell align="center">{getVerificationStatus(row.index)}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" sx={{backgroundColor: `${palette('dark').primary.neonGreen}`, color: 'white'}} onClick={() => onOpenDialgo(row)}>
                          Details
                        </Button>
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

        <VerificationJob
          open={verificationJobDialogOpen}
          onClose={onCloseDialog}
          row={detailRow}
        />
      </Container>
    </StyledRoot>
  );
};

function applyFilter({ inputData, searchParam, comparator, limitTime}: { inputData: Job[]; searchParam:string; comparator: (a: any, b: any) => number; limitTime:number}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  const filteredData = stabilizedThis.filter(
    (el) => (
      ( (el[0].status > JOB_STATUS.CREATED) && (el[0].status < JOB_STATUS.POSTED) ) || 
      ( (el[0].status > JOB_STATUS.JOB_SUBMITTED && el[0].status < JOB_STATUS.COMPLETED1) ) || 
      ( (el[0].status === JOB_STATUS.JOB_SUBMITTED && isLimitTimeOver(el[0].submittedAt, limitTime)) )
    )
  )
  const filteredDataBySearch = searchParam && searchParam !== '' ? filteredData.filter((el) => el[0].title.toLowerCase().includes(searchParam) || el[0].description.toLowerCase().includes(searchParam)) : filteredData;

  inputData = filteredDataBySearch.map((el) => el[0]);

  return inputData;
}

XAgencyVerficiation.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>Verification | Agency</title>
    </Head>
    <LayoutXAgency>{page}</LayoutXAgency>
  </MainLayout>
);

export default XAgencyVerficiation;
