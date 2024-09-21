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
  IconButton,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUp from '@mui/icons-material/TrendingUp';

interface Data {
  id: number;
  time: number;
  item: string;
  price: number;
  seller: string;
}

const tableData: Data[] = [
  {
    id: 1,
    time: 7,
    item: '/assets/images/home/carousel_3.png',
    price: 13.472,
    seller: 'Random Sller',
  },
  {
    id: 2,
    time: 7,
    item: '/assets/images/home/carousel_3.png',
    price: 13.472,
    seller: 'Random Sller',
  },
  {
    id: 3,
    time: 7,
    item: '/assets/images/home/carousel_3.png',
    price: 13.472,
    seller: 'Random Sller',
  },
  {
    id: 4,
    time: 7,
    item: '/assets/images/home/carousel_3.png',
    price: 13.472,
    seller: 'Random Sller',
  },
  {
    id: 5,
    time: 7,
    item: '/assets/images/home/carousel_3.png',
    price: 13.472,
    seller: 'Random Sller',
  },
];

const ActivityTable = () => {
  const [orderBy, setOrderBy] = React.useState<string>('calories');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

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
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'time'}
                  direction={orderBy === 'time' ? order : 'asc'}
                  onClick={() => handleSort('time')}
                >
                  <TimerIcon fontSize="large" />
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'item'}
                  direction={orderBy === 'item' ? order : 'asc'}
                  onClick={() => handleSort('item')}
                >
                  ITEM
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleSort('price')}
                >
                  PRICE
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'seller'}
                  direction={orderBy === 'seller' ? order : 'asc'}
                  onClick={() => handleSort('seller')}
                >
                  SELLER
                </TableSortLabel>
              </TableCell>
              <TableCell>BUY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.time}s</TableCell>
                <TableCell>
                  <Avatar alt="Remy Sharp" src={data.item} />
                </TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>{data.seller}</TableCell>
                <TableCell>
                  <Button variant="soft">Buy</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default ActivityTable;
