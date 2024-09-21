// Reacts
import { useState } from 'react';
// components
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogContent,
  Button,
  IconButton,
} from '@mui/material';
import { nftPeriods } from '@/_mock/arrays/_nftFilters';
import FullscreenIcon from '@mui/icons-material/FullscreenSharp';
import Chart, { useChart } from '../chart';

// ----------------------------------------------------------------------

const series = [{ name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] }];

export default function SalesInfo() {
  const [showOrder, setShowOrder] = useState(2);

  const handleShowOrder = (e: SelectChangeEvent) => {
    setShowOrder(parseInt(e.target.value, 10));
  };

  const [open, setOpen] = useState(false);

  const chartOptions = useChart({
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <Typography>Floor Price</Typography>
        <FormControl>
          <InputLabel id="select-period-label">Period</InputLabel>
          <Select
            key="period-select"
            labelId="select-order-label"
            id="demo-select-small"
            value={showOrder.toString()}
            label="Category"
            variant="outlined"
            onChange={handleShowOrder}
          >
            {nftPeriods.map((order, index) => (
              <MenuItem value={order.value} key={`periodMenu-${index}`}>
                {order.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={handleOpen} color="primary">
          <FullscreenIcon />
        </IconButton>
      </Box>
      <Chart type="area" series={series} options={chartOptions} height={320} />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent sx={{ overflow: 'hidden' }}>
          <Chart type="area" series={series} options={chartOptions} />
        </DialogContent>
      </Dialog>
    </>
  );
}
