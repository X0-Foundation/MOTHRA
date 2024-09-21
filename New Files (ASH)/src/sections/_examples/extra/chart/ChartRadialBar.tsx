// @mui
import { useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const series = [44, 55];

export default function ChartRadialBar() {
  const theme = useTheme();

  const chartOptions = useChart({
    labels: ['Apples', 'Oranges'],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light, opacity: 1 },
            { offset: 100, color: theme.palette.primary.main, opacity: 1 },
          ],
          [
            { offset: 0, color: theme.palette.info.light, opacity: 1 },
            { offset: 100, color: theme.palette.info.main, opacity: 1 },
          ],
        ],
      },
    },
    legend: {
      horizontalAlign: 'center',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '68%',
        },
        dataLabels: {
          value: {
            offsetY: 16,
          },
          total: {
            formatter: () => fNumber(2324),
          },
        },
      },
    },
  });

  return <Chart type="radialBar" series={series} options={chartOptions} height={400} />;
}
