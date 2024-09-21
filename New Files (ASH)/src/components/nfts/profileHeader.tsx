import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { FileCopy, Upload } from '@mui/icons-material';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useState } from 'react';

const XNftProfileHeader: React.FC = () => {
  const isMobile = useResponsive('down', 'sm');
  const [copyCliped, setCopyCliped] = useState(false);
  const shortenedAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopyToClipboard = () => {
    setCopyCliped(true);
  };
  return (
    <Box sx={{ mt: 3 }}>
      {/* Background and avatar */}
      <Card sx={{ width: '100%', position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? '150' : '300'}
          image="/assets/images/about/what_2.jpg"
          alt="Cover Photo"
        />
        <Avatar
          alt="Profile Picture"
          src="/assets/images/home/carousel_3.png"
          sx={{
            width: {
              xs: 100,
              md: 150,
            },
            height: {
              xs: 100,
              md: 150,
            },
            position: 'absolute',
            bottom: {
              md: 10,
              xs: 70,
            },
            left: {
              md: '10%',
              xs: '15%',
            }, // Center the avatar horizontally
            transform: 'translateX(-50%)', // Adjust for centering
            border: '2px solid white',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: {
              md: '80%',
              xs: '100%',
            },
            float: 'right',
            flexDirection: {
              md: 'row',
              xs: 'column',
            },
            my: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'end' },
            }}
          >
            <Typography variant="body1">
              {isMobile
                ? shortenedAddress(
                    '0x1f4542f8b58436978448b7ebe0a292b07d71efd857089e01cb412cf3ba56d842',
                  )
                : '0x1f4542f8b58436978448b7ebe0a292b07d71efd857089e01cb412cf3ba56d842'}
            </Typography>

            {/* Icon Button for Copying to Clipboard */}
            <IconButton
              onClick={handleCopyToClipboard}
              aria-label="Copy to clipboard"
              color={copyCliped ? 'primary' : 'info'}
            >
              <FileCopy fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button color="primary" variant="soft">
              Edit Profile
            </Button>
            <Button color="primary" variant="soft" sx={{ ml: 2 }}>
              Sell
            </Button>
            <IconButton aria-label="Upload" color="primary" sx={{ ml: 2 }}>
              <Upload fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default XNftProfileHeader;
