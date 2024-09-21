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
  Box,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { useState } from 'react';

interface Data {
  avatar: string;
  name: string;
  floorPrice: number;
  floorChange: number;
  volume: number;
  volumeChange: number;
  items: number;
  changes: number;
}

const tableData: Data[] = [
  {
    avatar: '/assets/images/home/carousel_3.png',
    name: 'Bored Ape Yache Club',
    floorPrice: 12.3,
    floorChange: -5,
    volume: -1004,
    volumeChange: 35,
    items: 10000,
    changes: 5800,
  },
  {
    avatar: '/assets/images/home/carousel_3.png',
    name: 'Bored Ape Yache Club',
    floorPrice: 12.3,
    floorChange: 7,
    volume: 304,
    volumeChange: 35,
    items: 4000,
    changes: 5800,
  },
  {
    avatar: '/assets/images/home/carousel_3.png',
    name: 'Bored Ape Yache Club',
    floorPrice: 12.3,
    floorChange: -5,
    volume: -1004,
    volumeChange: 35,
    items: 10000,
    changes: 5800,
  },
];

const CollectionListTable = () => {
  const [orderBy, setOrderBy] = React.useState<string>('id');
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Card>
      <CardHeader
        title="Collections"
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
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  <TimerIcon fontSize="large" />
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === ''}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  COLLECTION
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'floorPrice'}
                  direction={orderBy === 'floorPrice' ? order : 'asc'}
                  onClick={() => handleSort('floorPrice')}
                >
                  FLOOR PRICE
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ p: 1 }}>
                <TableSortLabel
                  active={orderBy === 'floorChange'}
                  direction={orderBy === 'floorChange' ? order : 'asc'}
                  onClick={() => handleSort('floorChange')}
                >
                  FLOOR CHANGE
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'volume'}
                  direction={orderBy === 'volume' ? order : 'asc'}
                  onClick={() => handleSort('volume')}
                >
                  Volume
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'volumeChange'}
                  direction={orderBy === 'volumeChange' ? order : 'asc'}
                  onClick={() => handleSort('volumeChange')}
                >
                  VOLUME CHANGE
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'items'}
                  direction={orderBy === 'items' ? order : 'asc'}
                  onClick={() => handleSort('items')}
                >
                  ITEMS
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'changes'}
                  direction={orderBy === 'changes' ? order : 'asc'}
                  onClick={() => handleSort('changes')}
                >
                  CHANGES
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {tableData.map((data, index) => (
              <TableRow key={`cl-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt="Remy Sharp" src={data.avatar} />
                  {data.name}
                </TableCell>
                <TableCell>{data.floorPrice}</TableCell>
                <TableCell>{data.floorChange}</TableCell>
                <TableCell>{data.volume}</TableCell>
                <TableCell>{data.volumeChange}</TableCell>
                <TableCell>{data.items}</TableCell>
                <TableCell>{data.changes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default CollectionListTable;
