import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for the logo image
const LogoImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  left: 16,
  width: 100, // Adjust width as needed
  height: 100, // Adjust height as needed
  zIndex: 1,
}));

// Styled component for the stats box
const StatBox = styled(Box)(({ theme }) => ({
  color: 'white',
  // background: 'rgba(0, 0, 0, 0.7)', // Add a translucent background
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
  display: 'flex',
  width: '100%',
  flexShrink: 0,
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
}));

// Styled component for the text with yellow stroke
const YellowStrokeTypography = styled(Typography)(({ theme }) => ({
  textShadow: '0 0 3px black, 0 0 5px black',
}));

const CollectionStatsCard = () => {
  const [value, setValue] = useState();

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 300, // Adjust height as needed
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundImage: `url(/assets/images/home/carousel_3.png)`,
        }}
      >
        <CardContent
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: '16px', // Adjust padding as needed
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h3" component="div" color="white">
            Azuki
          </Typography>
          <Box color="white">
            <YellowStrokeTypography variant="body2">
              Address: Value
            </YellowStrokeTypography>
            {/* <YellowStrokeTypography variant="body2"> */}
            {/*   Royalties: Value */}
            {/* </YellowStrokeTypography> */}
            {/* <YellowStrokeTypography variant="body2"> */}
            {/*   Description HERE */}
            {/* </YellowStrokeTypography> */}
          </Box>
        </CardContent>
        <LogoImage src="/assets/images/home/carousel_3.png" alt="Logo" />
      </Card>
      <StatBox>
        <Typography variant="body2">Floor Price: Value</Typography>
        {/* <Typography variant="body2">Top Offer: Value</Typography> */}
        <Typography variant="body2">24hr Volume: Value</Typography>
        <Typography variant="body2">24hr Sales: Value</Typography>
        <Typography variant="body2">All Volume: Value</Typography>
      </StatBox>
    </>
  );
};

export default CollectionStatsCard;
