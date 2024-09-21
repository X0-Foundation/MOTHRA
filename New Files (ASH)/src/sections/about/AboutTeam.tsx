import { m } from 'framer-motion';
// @mui
import { Box, Card, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'left' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ my: 3 }}>
          Projects Completed Using The Agency
        </Typography>
      </m.div>
      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {_carouselsMembers.map((card) => (
          <m.div variants={varFade().inUp} key={card.name}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ textAlign: 'left', mb: 2 }}>
                Our Works
              </Typography>
              <Image
                src={card.avatar}
                alt="our works"
                sx={{ mx: 'auto', width: 'auto', height: 'auto' }}
              />
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
