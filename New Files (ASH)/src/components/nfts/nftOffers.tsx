import { m } from 'framer-motion';
// @mui
import { Typography, Card, CardHeader, CardContent, IconButton } from '@mui/material';
// layouts
import { ComingSoonIllustration } from '@/assets/illustrations';
// components
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import { MotionContainer, varBounce } from '../animate';

export default function XNftOffers() {
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title="Offers"
        avatar={
          <IconButton>
            <LocalOfferSharpIcon fontSize="large" color="primary" />
          </IconButton>
        }
      />
      <CardContent>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <ComingSoonIllustration
              sx={{
                height: 150,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>
          <m.div variants={varBounce().in}>
            <Typography sx={{ textAlign: 'center' }}>No Offers Yet !</Typography>
          </m.div>
        </MotionContainer>
      </CardContent>
    </Card>
  );
}
