// MUI
import { Avatar, Card, CardHeader, CardContent } from '@mui/material';
import { AutoGraph } from '@mui/icons-material';
// Component
import Chart, { useChart } from '../chart';

const series = [{ name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] }];

const XNftPriceHistory = () => {
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

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title="Price History"
        avatar={
          <Avatar>
            <AutoGraph fontSize="large" color="primary" />
          </Avatar>
        }
      />
      <CardContent>
        <Chart type="line" series={series} options={chartOptions} height={320} />
      </CardContent>
    </Card>
  );
};

export default XNftPriceHistory;
