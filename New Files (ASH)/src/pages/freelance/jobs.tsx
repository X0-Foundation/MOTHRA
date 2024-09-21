/* eslint-disable import/no-cycle */
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from '@/components/table';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import palette from '@/theme/palette';
import { MotionViewport } from '@/components/animate';
import Scrollbar from '@/components/scrollbar';
import { StyledRoot } from '@/layouts/login/styles';
import LayoutXAgency from '@/layouts/main/freelance';
import MainLayout from '@/layouts/main';
import { JOB_STATUS, Job, compareAddress, formatText } from '@/states/common';
import SendQuate from '@/sections/freelance/sendQuate';
import ViewSellers from '@/sections/freelance/viewSellers';

import { useAccount } from 'wagmi';
import { useJobTypes, useJobList, useAgentsForJobs } from '@/hooks';
import CreateJob from '@/sections/freelance/createJob';

const TABLE_HEAD_JOBS = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'escrowAmount', label: 'Price', align: 'center' },
  { id: 'bidderCount', label: 'Sellers', align: 'center' },
  { id: 'details', label: 'Job Detail', align: 'center' },
  { id: 'sellers', label: 'Seller Detail', align: 'center' },
];

const XAgencyJobs = () => {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultOrderBy: 'calories' });

  const { address } = useAccount();

  const jobTypes = useJobTypes();
  const jobList = useJobList();
  const { agentsForJobs } = useAgentsForJobs();

  const [isCreating, setIsCreating] = useState(false);
  const [detailRow, setDetailRow] = useState<Job>();
  const [mounted, setMounted] = useState(false);
  const [tableData, setTableData] = useState<Job[]>([]);
  const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);
  const [viewSellersDialogOpen, setViewSellersDialogOpen] = useState(false);
  const [sendQuateDialogOpen, setSendQuateDialogOpen] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const denseHeight = dense ? 24 : 54;

  const dataFiltered = applyFilter({
    inputData: tableData,
    searchParam,
    comparator: getComparator(order, orderBy),
  });

  const handleCreatJobDialogOpen = () => {
    setIsCreating(true);
    setDetailRow(undefined);
    setCreateJobDialogOpen(true);
  };

  const handleCreatJobDialogClose = useCallback((code: string) => {
    setIsCreating(false);
    setCreateJobDialogOpen(false);
    if (code === 'open_send_quate') {
      setSendQuateDialogOpen(true);
    }
  }, []);

  const handleSendQuateDialogClose = useCallback(() => {
    setSendQuateDialogOpen(false);
  }, []);

  const handleViewSellerDialogClose = useCallback(() => {
    setViewSellersDialogOpen(false);
  }, []);

  const handleOpenDetail = useCallback((row: Job) => {
    setIsCreating(false);
    setDetailRow(row);
    setCreateJobDialogOpen(true);
  }, []);

  const handleViewSellers = useCallback((row: Job) => {
    setDetailRow(row);
    setViewSellersDialogOpen(true);
  }, []);

  const getBidderCount = (_jobId: number) => {
    try {
      if (agentsForJobs.length > 0) {
        return agentsForJobs[_jobId].bidders.length;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    setMounted(true);
    setDetailRow(undefined);
  }, []);

  useEffect(() => {
    setTableData(jobList);
  }, [jobList]);

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.400'),
          }}
        >
          <h2 className="agency-title" style={{ color: `${palette('dark').primary.purple}` }}>
            Jobs
          </h2>
          <p className="agency-description">
            You can view posted jobs in here, and you can send a quate for bidding jobs.
          </p>
        </Box>
        <Box
          sx={{ p: 2, mb: 3, display: 'grid', gap: 2, justifyContent: 'space-between' }}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
        >
          <TextField
            label="Search"
            type="search"
            size="small"
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: `${palette('dark').primary.neonGreen}`, color: 'white' }}
              onClick={handleCreatJobDialogOpen}
            >
              Create Job
            </Button>
          </Box>
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
                      <TableCell sx={{ minWidth: 200, maxWidth: 400 }}>
                        {formatText(row.title)}
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        {jobTypes[row.jobType]}
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        {row.escrowAmount}
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        {getBidderCount(row.index)}
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: `${palette('dark').primary.neonGreen}`,
                            color: 'white',
                          }}
                          onClick={() => handleOpenDetail(row)}
                        >
                          View Job
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ width: 'auto' }}>
                        {compareAddress(row.buyer, address) ? (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: `${palette('dark').primary.neonGreen}`,
                              color: 'white',
                            }}
                            onClick={() => handleViewSellers(row)}
                          >
                            View Sellers
                          </Button>
                        ) : (
                          '-'
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

        <CreateJob
          open={createJobDialogOpen}
          onClose={handleCreatJobDialogClose}
          isCreating={isCreating}
          row={detailRow}
        />
        <SendQuate
          open={sendQuateDialogOpen}
          onClose={handleSendQuateDialogClose}
          row={detailRow}
        />
        <ViewSellers
          open={viewSellersDialogOpen}
          onClose={handleViewSellerDialogClose}
          row={detailRow}
        />
      </Container>
    </StyledRoot>
  );
};

function applyFilter({
  inputData,
  searchParam,
  comparator,
}: {
  inputData: Job[];
  searchParam: string;
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  const filteredData = stabilizedThis.filter((el) => el[0].status === JOB_STATUS.POSTED);
  const filteredDataBySearch =
    searchParam && searchParam !== ''
      ? filteredData.filter(
          (el) =>
            el[0].title.toLowerCase().includes(searchParam) ||
            el[0].description.toLowerCase().includes(searchParam)
        )
      : filteredData;

  inputData = filteredDataBySearch.map((el) => el[0]);

  return inputData;
}

XAgencyJobs.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>Jobs | Agency</title>
    </Head>
    <LayoutXAgency> {page} </LayoutXAgency>
  </MainLayout>
);

export default XAgencyJobs;
