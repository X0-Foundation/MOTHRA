/* eslint-disable import/no-cycle */
import { Box, Container, Grid } from '@mui/material';
import { NavSectionHorizontal } from '@/components/nav-section';
import CustomSearchSelect from '@/components/search-select/SearchSelect';
import { MotionViewport } from '@/components/animate';

type Props = {
  children?: React.ReactNode;
};

const XLayoutXNfts = ({ children }: Props) => {
  const SUB_NAV_ITEMS = [
    {
      subheader: 'NFTs',
      items: [
        {
          title: 'Home',
          path: '/nfts/home',
        },
        {
          title: 'Explore',
          path: '/nfts/explore',
        },
        {
          title: 'Mint',
          path: '/nfts/mint',
        },
        {
          title: 'Import',
          path: '/nfts/import',
        },
        {
          title: 'Profile',
          path: '/nfts/profile',
        },
      ],
    },
  ];

  return (
    <Container maxWidth="xl" component={MotionViewport}>
      <Grid container sx={{ display: 'flex', my: 3, justifyContent: 'center' }}>
        <NavSectionHorizontal data={SUB_NAV_ITEMS} />
        {/* <CustomSearchSelect /> */}
      </Grid>
      <Box>{children}</Box>
    </Container>
  );
};

export default XLayoutXNfts;
