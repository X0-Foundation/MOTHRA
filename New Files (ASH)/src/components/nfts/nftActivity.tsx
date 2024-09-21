import * as React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableSortLabel,
  Card,
  CardHeader,
  Avatar,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { BarChart } from '@mui/icons-material';

interface Data {
  id: number;
  imgUrl: string;
  name: string;
  type: number;
  total: number;
  seller: string;
  buyer: string;
  time: string;
}

const tableData: Data[] = [
  {
    id: 1,
    imgUrl: '/assets/images/home/carousel_3.png',
    name: 'Experiement #1002',
    seller: '0x1cFDBd2dFf70C6e2e30df5012726F87731F38164',
    buyer: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    type: 1,
    total: 2.044,
    time: '10m',
  },
  {
    id: 1,
    imgUrl: '/assets/images/home/carousel_3.png',
    name: 'Experiement #1002',
    seller: '0x1cFDBd2dFf70C6e2e30df5012726F87731F38164',
    buyer: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    type: 1,
    total: 2.044,
    time: '10m',
  },
  {
    id: 1,
    imgUrl: '/assets/images/home/carousel_3.png',
    name: 'Experiement #1002',
    seller: '0x1cFDBd2dFf70C6e2e30df5012726F87731F38164',
    buyer: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    type: 2,
    total: 2.044,
    time: '10m',
  },
  {
    id: 1,
    imgUrl: '/assets/images/home/carousel_3.png',
    name: 'Experiement #1002',
    seller: '0x1cFDBd2dFf70C6e2e30df5012726F87731F38164',
    buyer: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    type: 1,
    total: 2.044,
    time: '10m',
  },
  {
    id: 1,
    imgUrl: '/assets/images/home/carousel_3.png',
    name: 'Experiement #1002',
    seller: '0x1cFDBd2dFf70C6e2e30df5012726F87731F38164',
    buyer: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    type: 2,
    total: 2.044,
    time: '10m',
  },
];

const XNftActivityTable = () => {
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const shortenedAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Card>
      <CardHeader
        title="Activity"
        avatar={
          <IconButton>
            <TrendingUp fontSize="large" color="primary" />
          </IconButton>
        }
      />

      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 1 }} />

              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  NAME
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  TYPE
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'total'}
                  direction={orderBy === 'total' ? order : 'asc'}
                  onClick={() => handleSort('total')}
                >
                  TOTAL
                </TableSortLabel>
              </TableCell>
              <TableCell>SELLER</TableCell>
              <TableCell>BUYER</TableCell>
              <TableCell>TIME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Avatar alt="Remy Sharp" src={data.imgUrl} />
                </TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {data.type === 1 && (
                    <Button variant="soft" size="small" color="error">
                      List
                    </Button>
                  )}
                  {data.type === 2 && (
                    <Button variant="soft" color="info">
                      Sale
                    </Button>
                  )}
                </TableCell>
                <TableCell>{data.total}</TableCell>
                <TableCell>{shortenedAddress(data.seller)}</TableCell>
                <TableCell>{shortenedAddress(data.buyer)}</TableCell>
                <TableCell>{data.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default XNftActivityTable;
