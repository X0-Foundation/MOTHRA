import * as React from 'react';
// Mui Components
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
} from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/router';
// theme
import { useTheme } from '@mui/material/styles';
// services
import { getNFTMetaData } from '@/utils/nftUtils';

interface Props {
  itemId: string;
  data?: any;
}

const NftCard = (props: Props) => {
  const isMobile = useResponsive('down', 'sm');
  const theme = useTheme();
  const router = useRouter();
  const { itemId, data } = props;
  const [nftData, setNftData] = useState(null);
  const handleNavigation = () => {
    router.push(`/nfts/home/nft/${itemId}`);
  };

  useEffect(() => {
    if (data) {
      getNFTMetaData(data.collection, data.token_id).then((result) => {
        console.log(result.raw.normalized_metadata);
        setNftData(result.raw.normalized_metadata); // Set fetched data to state
      });
    }
  }, [data]);

  return (
    <Card
      sx={{ maxWidth: 345, m: 'auto', mt: isMobile ? 2 : 0 }}
      onClick={handleNavigation}
    >
      {!data ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="100%"
          image=""
          alt="Nft Image"
          sx={{ background: theme.palette.background.neutral }}
        />
      )}

      <CardContent sx={{ backgroundColor: theme.palette.background.paper }}>
        <Typography gutterBottom variant="h5" component="div">
          {data?.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Floor Price
            </Typography>
            <Typography variant="body2" color="text.secondary">
              500FTM
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              24h Volume
            </Typography>
            <Typography variant="body2" color="text.secondary">
              500FTM
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={1}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '90%',
              // backgroundColor: '#120c18',
              p: 1,
              justifyContent: 'center',
              borderRadius: 1,
            }}
          >
            <li style={{ color: '#7fb742' }}>Live</li>
            <Typography variant="body2" color="text.primary" sx={{ pl: 2 }}>
              ends: 01d 20h 31m
            </Typography>
          </Box>

          <Button variant="soft" size="small">
            Buy
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NftCard;
