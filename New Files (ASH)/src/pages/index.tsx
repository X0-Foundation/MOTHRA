import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { HomeMinimal, XStatsOfHtzAndTvl } from '../sections/home';
import { AboutTeam } from '../sections/about';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Head>
        <title> XFoundation TGR</title>
      </Head>

      {progress}

      {/* <HomeHero /> */}

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />
        <XStatsOfHtzAndTvl />
        <AboutTeam />
      </Box>
    </>
  );
}
