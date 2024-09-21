import * as React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableSortLabel,
  Avatar,
} from '@mui/material';

interface Data {
  id: number;
  wallet: string;
  volume7d: number;
}

const tableData: Data[] = [
  {
    id: 1,
    wallet: '32dsjvcntf',
    volume7d: 112354.54,
  },
  {
    id: 2,
    wallet: '32dsjvcntf',
    volume7d: 112354.54,
  },
  {
    id: 3,
    wallet: '32dsjvcntf',
    volume7d: 112354.54,
  },
  {
    id: 4,
    wallet: '32dsjvcntf',
    volume7d: 112354.54,
  },
  {
    id: 5,
    wallet: '32dsjvcntf',
    volume7d: 112354.54,
  },
];

const DepthComp = () => {
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ p: 0, textAlign: 'center' }}>
            <TableSortLabel>Rank</TableSortLabel>
          </TableCell>
          <TableCell sx={{ p: 0, textAlign: 'center' }}>
            <TableSortLabel>Wallet</TableSortLabel>
          </TableCell>
          <TableCell sx={{ p: 0, textAlign: 'center' }}>
            <TableSortLabel
              active={orderBy === 'volume7d'}
              direction={orderBy === 'volume7d' ? order : 'asc'}
              onClick={() => handleSort('volume7d')}
            >
              Volume 7D
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((data, index) => (
          <TableRow key={data.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt="Remy Sharp" src="/assets/images/home/carousel_3.png" />
              &nbsp;&nbsp;{data.wallet}
            </TableCell>
            <TableCell>{data.volume7d}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepthComp;
