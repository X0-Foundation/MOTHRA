import Link from "next/link";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from "@mui/material";
import { TableHeadCustom, TablePaginationCustom, getComparator, useTable } from "@/components/table";
import { useCallback, useEffect, useState } from "react";
import { Address } from 'viem';
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { Bid, JOB_STATUS, Job, compareAddress, formatText, taskContractAddress } from "@/states/common";
import { formatAddressWithMiddleDot } from "@/utils/formatAddress";
import { useAgentsForJobs } from "@/hooks";
import Scrollbar from "@/components/scrollbar/Scrollbar";
import ToastMessage from "@/components/toast";
import abiTask from '@/abi/abiTask.json';
import { JobDialogProps } from "./createJob";

const TABLE_HEAD_SELLERS = [
    { id: 'id', label: 'No', align: 'center' },
    { id: 'address', label: 'Sellers', align: 'center' },
    { id: 'quate', label: 'Quates', align: 'center' },
    { id: 'hire', label: 'Hire', align: 'center' },
];

export default function ViewSellers(props: JobDialogProps) {
    const { page, order, orderBy, rowsPerPage, onSort, onChangePage, onChangeRowsPerPage } = useTable({defaultOrderBy: 'calories',});
    const {onClose, open, row} = props;
    const theme = useTheme();

    const {agentsForJobs} = useAgentsForJobs();

    const [isProcessing, setIsProcessing] = useState(false);
    const [rowId, setRowId] = useState(-1);
    const [tableData, setTableData] = useState<Bid[]>([]);
    const [mounted, setMounted] = useState(false);
    
    const notify = (type: string, message: string) => {
        ToastMessage({type, message});
    }

    const handleClose = useCallback(() => {
        onClose("");
    },[onClose])
    
    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
    });

    // const handleHire = useCallback(
    //   async (_seller:string) => {
    //     if(row) {
    //         try {
    //             setLoading(true);
    //             const { request } = await prepareWriteContract({
    //                 address: taskContractAddress as Address,
    //                 abi: abiTask,
    //                 functionName: 'assignSellerToJob',
    //                 args: [row.index, _seller],
    //             });
    //             const { hash } = await writeContract(request);            
    //             await waitForTransaction({hash});
                
    //             setLoading(false);
    //             notify("success", "Successfully assigned");
    //             handleClose();
    //         } catch (err) {
    //             setLoading(false);
    //             console.error(err);
    //             notify("error", "Failed assigning");
    //         }
    //     };
    //   },
    //   [handleClose, row],
    // )
    
    useEffect(() => {
        setMounted(true)
        if(row) {
            setTableData(agentsForJobs[row.index]?.bidders);
            setRowId(row.index);
        }
    }, [agentsForJobs, row])
    
    return (
        <Dialog 
            fullWidth
            maxWidth="md"
            onClose={handleClose} 
            open={open}>
            <DialogTitle>View Sellers</DialogTitle>
            <DialogContent>
                <DialogContentText>You can see sellers for this job</DialogContentText>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    <TableContainer sx={{position: 'relative', overflow: 'unset' }}>
                        <Scrollbar>
                            <Table size="small" sx={{ minWidth: 600 }}>
                                <TableHeadCustom 
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD_SELLERS}
                                    onSort={onSort}
                                    rowCount={tableData?.length}
                                />
                                <TableBody>
                                    {dataFiltered && dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRowCustomized key={index} item={item} agents={agentsForJobs[rowId]} rowNo={index} index={rowId} theme={theme} handleProcessing={setIsProcessing} handleClose={handleClose} handleNotify={notify}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Box>
                {mounted && (
                        <TablePaginationCustom 
                            count={dataFiltered?.length}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />
                    )}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>handleClose()} disabled={isProcessing}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

const TableRowCustomized = (props:any)=>{
    const {item, agents, theme, handleClose, handleNotify, index, handleProcessing, rowNo} = props;
    const [expand, setExpand] = useState(true);
    const [loading, setLoading] = useState(false);

    const isHirable = (job: Job) => {
        if(job.status >= JOB_STATUS.INPROGRESSING) return false;
        return true;
    }

    const handleHire = useCallback(
        async (_seller:string) => {
            console.log('Index', index);
          if(index !== '' && index > -1) {
              try {
                  setLoading(true);
                  handleProcessing(true);
                  const { request } = await prepareWriteContract({
                      address: taskContractAddress as Address,
                      abi: abiTask,
                      functionName: 'assignSellerToJob',
                      args: [index, _seller],
                  });
                  const { hash } = await writeContract(request);            
                  await waitForTransaction({hash});
                  
                  setLoading(false);
                  handleProcessing(false);
                  handleNotify("success", "Successfully assigned");
                  handleClose();
              } catch (err) {
                  setLoading(false);
                  handleProcessing(false);
                  console.error(err);
                  handleNotify("error", "Failed assigning");
              }
          };
        },
        [handleClose, handleNotify, handleProcessing, index],
      )

    return (
        <TableRow hover>
            <TableCell align="center">{rowNo + 1}</TableCell>
            <TableCell align="center" sx={{maxWidth: 100}}>
                <Link href={`/agency/profile?address=${item.bidder}`} style={{textDecoration:'none', color:`${theme.palette.primary.main}`, fontWeight: 'bold'}} target="_blank">
                    {formatAddressWithMiddleDot(item.bidder)}
                </Link>
            </TableCell>
            <TableCell align="left" sx={{minWidth: 200, maxWidth: 300, wordWrap: 'break-word' }}>
                {formatText(item.description, expand)}
                <Button sx={{fontSize:'12px'}} onClick={()=>setExpand(!expand)}>
                    {expand ? 'Show More':'Less'}
                </Button>
            </TableCell>
            <TableCell align="center" sx={{maxWidth: 100}}>
                <Button variant="contained" sx={{backgroundColor: `${theme.palette.primary.neonGreen}`, color: 'white'}}  onClick={()=>handleHire(item.bidder)} disabled={loading || !isHirable(item)}>
                    {loading? "Processing..." : (
                        <>
                            {compareAddress(item.bidder, agents.seller) ? "Hired" : "Hire"}
                        </>
                    )}
                </Button>
            </TableCell>
        </TableRow>
    )
}

function applyFilter({inputData,comparator,}: {inputData: Bid[]; comparator: (a: any, b: any) => number;}) {
    const stabilizedThis = inputData?.map((el, index) => [el, index] as const);

    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);

        if (order !== 0) return order;

        return a[1] - b[1];
    });
    inputData = stabilizedThis?.map((el) => el[0]);

    return inputData;
}