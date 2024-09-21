import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Grid, /* CardHeader, CardContent, Card */ } from '@mui/material';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
// theme
import { secondaryFont } from '../../theme/typography';
// components
import { MotionContainer, varFade } from '../../components/animate';
// import { CarouselAnimation } from '../_examples/extra/carousel';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 480,
  height: 480,
  top: -80,
  right: -80,
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  if (hide) {
    return null;
  }

  return (
    <>
      <StyledRoot>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid item xs={12} md={6} sx={{ height: 1 }}>
              <Description />
            </Grid>
            {/* <Grid item xs={12} md={6} sx={{ height: 1 }} display={'flex'} alignItems={'center'}> */}
            {/*  <Content /> */}
            {/* </Grid> */}
          </Grid>
        </Container>

        <StyledEllipseTop />

        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Welcome To <br />
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 200,
            repeat: Infinity,
          }}
        >
          TGR
        </StyledGradientText>
      </m.div>
    </StyledDescription>
  );
}

// const Content = () => {
//   const _carouselData = [
//     {
//       id: '0',
//       title: 'Example 1',
//       image: '/assets/images/home/carousel_1.png',
//       description: 'nothing',
//     },
//     {
//       id: '0',
//       title: 'Example 2',
//       image: '/assets/images/home/carousel_2.png',
//       description: 'nothing',
//     },
//     {
//       id: '0',
//       title: 'Example 3',
//       image: '/assets/images/home/carousel_3.png',
//       description: 'nothing',
//     },
//   ];

//   return (
//     <Card>
//       <CardHeader title="Our Works" />
//       <CardContent>
//         <CarouselAnimation data={_carouselData} />
//       </CardContent>
//     </Card>
//   );
// };
