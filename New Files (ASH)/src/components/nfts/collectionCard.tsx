import { useRouter } from 'next/router';
// Mui Components
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Skeleton,
} from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// theme
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

interface Props {
  itemId: string;
  data?: any;
}
const CollectionCard = (props: Props) => {
  const isMobile = useResponsive('down', 'sm');
  const theme = useTheme();
  const router = useRouter();
  const { itemId, data } = props;

  const handleNavigation = () => {
    router.push({
      pathname: `/nfts/home/collection/${itemId}`,
      // query: data
    });
  };

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
          image={data?.uri ? data.uri : ''}
          alt="green iguana"
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
              Holders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              122
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Items
            </Typography>
            <Typography variant="body2" color="text.secondary">
              348
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
