// next
import Head from 'next/head';
// Layouts
import MainLayout from '@/layouts/main/MainLayout';
import XLayoutXNfts from '@/layouts/main/nfts';
// components
import {
  StatsCard,
  XNftBuy,
  XNftPriceHistory,
  XNftDetails,
  XNftTraits,
  XNftActivity,
  XNftOffers,
} from '@/components/nfts';
import { Grid } from '@mui/material';

const XIntoMoreNfts = () => {
  const statsData = {
    floorPrice: 3.5,
    totalSupply: 10000,
    owners: 5000,
  };

  return (
    <Grid container spacing={5} sx={{ mt: 5 }}>
      <Grid item xs={12} md={8}>
        <StatsCard title="Azuki Stats" data={statsData} />
      </Grid>
      <Grid item xs={12} md={4}>
        <XNftBuy />
        <XNftPriceHistory />
      </Grid>
      <Grid item xs={12} md={6}>
        <XNftDetails />
      </Grid>
      <Grid item xs={12} md={6}>
        <XNftOffers />
      </Grid>
      <Grid item xs={12} md={6}>
        <XNftTraits />
      </Grid>
      <Grid item xs={12} md={6}>
        <XNftActivity />
      </Grid>
    </Grid>
  );
};

XIntoMoreNfts.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFTs | Individual</title>c
    </Head>
    <XLayoutXNfts> {page} </XLayoutXNfts>
  </MainLayout>
);

export default XIntoMoreNfts;
