import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/trade.png',
    title: 'Trade',
    description: 'Swap, Add Liquidity, Bridge ',
  },
  {
    icon: ' /assets/icons/home/agency.png',
    title: 'Agency',
    description:
      'Freelance Marketplace where you can earn TGR via either posting or submitting jobs',
  },
  {
    icon: ' /assets/icons/home/nfts.png',
    title: 'NFTs',
    description: 'NFT Marketplace where you can purchase NFTs',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(10, 5),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard
                sx={{
                  ...(index !== -1 && {
                    boxShadow: (theme) => ({
                      md: `-40px 40px 80px ${
                        theme.palette.mode === 'light'
                          ? alpha(theme.palette.grey[500], 0.16)
                          : alpha(theme.palette.common.black, 0.5)
                      }`,
                    }),
                  }),
                }}
              >
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {card.title}
                </Typography>

                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{ mx: 'auto', width: 48, height: 'auto' }}
                />

                <Typography sx={{ color: 'text.secondary', mt: 3 }}>{card.description}</Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
      </Container>
    </StyledRoot>
  );
}
