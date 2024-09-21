import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Stack, Divider, Container, Typography, Link } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// _mock_
import { _htzStats, _tgrStats, _tvlStats } from '../../_mock/arrays';
// components
import { MotionViewport, varSlide } from '../../components/animate';
import Label from '../../components/label';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function XStatsOfHTZAndTVL() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const isDesktop = useResponsive('up', 'md');

  const [currentTab, setCurrentTab] = useState('0');

  const desktopList = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{ borderRadius: 2, border: (theme) => `dashed 1px ${theme.palette.divider}` }}
    >
      <m.div key="tgrStats" variants={varSlide().inUp}>
        <StatCard key="tgrStatsDetail" stat={_tgrStats} />
      </m.div>
      <m.div key="htzStats" variants={varSlide().inUp}>
        <StatCard key="htzStatsDetail" stat={_htzStats} />
      </m.div>
      <m.div key="tvlStats" variants={varSlide().inUp}>
        <TVLCard key="tvlDetail" stat={_tvlStats} />
      </m.div>
    </Box>
  );

  const mobileList = (
    <>
      <Stack alignItems="center" sx={{ mb: 5 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          <Tab key="tgrTab" value="0" label="TGR Stats" />
          <Tab key="htzTab" value="1" label="HTZ Stats" />
          <Tab key="tvlTab" value="2" label="TVL" />
        </Tabs>
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {currentTab === '0' && <StatCard stat={_tgrStats} />}
        {currentTab === '1' && <StatCard stat={_htzStats} />}
        {currentTab === '2' && <TVLCard stat={_tvlStats} />}
      </Box>
    </>
  );

  return <>{isDesktop ? desktopList : mobileList}</>;
}

// ----------------------------------------------------------------------
interface StatValue {
  title: string;
  value: string | number;
}
interface StatCardProps {
  stat: {
    title: string;
    values: StatValue[];
  };
}

interface TVLCardProps {
  stat: {
    value: number | string;
    link: string;
  };
}

function StatCard({ stat }: StatCardProps) {
  const { title, values } = stat;

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">{title}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              position: 'absolute',
            }}
          />
        </Box>
      </Stack>
      <Stack spacing={2.5}>
        {values.map((value, index, array) => (
          <div key={index}>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{value.title}</span>
              <span>{value.value}</span>
            </Typography>
            {array.length - 1 !== index && <Divider />}
          </div>
        ))}
      </Stack>
    </Stack>
  );
}

const TVLCard = ({ stat }: TVLCardProps) => (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">Total Value Locked</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              position: 'absolute',
            }}
          />
        </Box>
      </Stack>
      <Stack spacing={2.5}>
        <h1>$ {stat.value}</h1>
        {/* TODO: need to add url here */}
        <Link
          href="https://google.com"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{ ml: 1 }}
        >
          <Label color="info"> Across All Farms and Pools </Label>
        </Link>
      </Stack>
    </Stack>
  );
