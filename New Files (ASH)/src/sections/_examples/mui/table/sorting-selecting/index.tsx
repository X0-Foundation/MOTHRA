import { useState, useEffect } from 'react';
// @mui
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  TextField,
  Box,
  Container,
} from '@mui/material';
// components
import { Job } from '@/states/common';
import { StyledRoot } from '@/layouts/login/styles';
import { MotionViewport } from '@/components/animate';
import { useTaskContract } from '@/hooks';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../../../components/table';
import Scrollbar from '../../../../../components/scrollbar';
//

// ----------------------------------------------------------------------

// type RowDataType = {
//   title: string;
//   jobType?: number;
//   escrowAmount: number;
// };

type Props = {
  variant?: 'jobs' | 'governance';
};

// const createJobData = (name: string, value: number, reward: number, rank: number) => ({ name, value, reward, rank });

// const createGovData = (name: string, date: number, value: number) => ({ name, date, value });

// const TABLE_DATA_GOVERNANCE = [
//   createGovData('Proposal One', 305, 3.7),
//   createGovData('Proposal Two', 452, 25.0),
//   createGovData('Proposal Three', 262, 16.0),
//   createGovData('Proposal Four', 159, 6.04),
//   createGovData('Proposal Five', 356, 16.0),
//   createGovData('Proposal Six', 408, 3.2),
//   createGovData('Proposal Seven', 237, 9.0),
//   createGovData('Proposal Eight', 375, 0.0),
//   createGovData('Proposal Nine', 518, 26.0),
//   createGovData('Proposal Ten', 392, 0.2),
//   createGovData('Proposal Eleven', 318, 0),
//   createGovData('Proposal Twelve', 360, 19.0),
// ];

// const TABLE_HEAD_JOBS = [
//   { id: 'title', label: 'Job Title', align: 'left' },
//   { id: 'jobType', label: 'Job Type', align: 'center' },
//   { id: 'escrowAmount', label: 'Price', align: 'center' },
//   { id: 'details', label: 'Details', align: 'center' },
// ];

const TABLE_HEAD_GOVERNANCE = [
  { id: 'title', label: 'Job Title', align: 'left' },
  { id: 'jobType', label: 'Job Type', align: 'center' },
  { id: 'escrowAmount', label: 'Price', align: 'center' },
  { id: 'details', label: 'Details', align: 'center' },
  // { id: 'vote', label: 'Vote', align: 'center' },
];

// ----------------------------------------------------------------------

export default function SortingSelecting({ variant = 'jobs' }: Props) {
  const { dense, page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({defaultOrderBy: 'calories',});

  const {jobList, jobTypes} = useTaskContract();

  const [tableData, setTableData] = useState<Job[]>([]);
  const [mounted, setMounted] = useState(false);
  // const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (variant === 'jobs') {
      setTableData(jobList);
    } else {
      setTableData(jobList);
    }
  }, [jobList, variant]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 24 : 54;

  // const handleCreatJobDialogOpen = () => {
  //   setCreateJobDialogOpen(true);
  // }

  // const handleCreatJobDialogClose = () => {
  //   setCreateJobDialogOpen(false);
  // }

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box
          sx={{ p: 2, mb: 3, display: 'grid', gap: 2 }}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
        >
          <TextField label="Search" type="search" size="small" />
            <Box>
              {/* <Button color={'info'} variant={'soft'} onClick={handleCreatJobDialogOpen}>
                Create Job
              </Button> */}
              {/* <Button color={'secondary'} variant={'soft'} sx={{ ml: 2 }}>
                Rules
              </Button> */}
            </Box>
        </Box>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD_GOVERNANCE}
                rowCount={tableData.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.title}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell align="center">{jobTypes[row.jobType]}</TableCell>
                      <TableCell align="center">{row.escrowAmount}</TableCell>
                      <TableCell align="center">
                        <Button color="info" variant="soft">
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

        {/* <CreateJob 
          open={createJobDialogOpen}
          onClose={handleCreatJobDialogClose}
        /> */}
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: Job[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
