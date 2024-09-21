// components/StatsCard.tsx
import { Card, CardContent, Typography, Box } from '@mui/material';
// hook
import { useTheme } from '@mui/material/styles';
import useResponsive from '@/hooks/useResponsive';

interface StatsCardProps {
  title: string;
  data: {
    floorPrice: number;
    totalSupply: number;
    owners: number;
  };
}

const NftStatsCard = ({ title, data }: StatsCardProps) => {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          pb: 50,
          backgroundImage: 'url(/assets/images/home/carousel_3.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'none',
        }}
      >
        <CardContent>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: '#bc3748',
                borderRadius: '16px',
              }}
            >
              <CardContent>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{ color: 'white' }}
                >
                  AZUKI
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>

      <Box
        sx={{ backgroundColor: theme.palette.background.paper, p: 2 }}
        display="flex"
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ pl: 2 }}>
          Description about the nft, where it comes from, who the artist is or
          whatever other information is necessary. This should be a multitude of
          things and many things likely be included here no doubt. However we
          must limit the overall text size after 4 lines otherwise it becomes
          rather
        </Typography>
      </Box>
    </>
  );
};

export default NftStatsCard;
