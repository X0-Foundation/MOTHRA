// React
import { useState } from 'react';
// next
import Head from 'next/head';
// Layouts
import MainLayout from '@/layouts/main/MainLayout';
import XLayoutXNfts from '@/layouts/main/nfts';
// components
import {
  ActivityTable,
  DepthComp,
  StatsCard,
  TopTraders,
  SaleInfo,
  TraitsInfo,
  XNftFilterComp,
} from '@/components/nfts';

import { Grid, Box, Card, CardHeader, CardContent, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const XIntoMoreCollections = () => {
  const statsData = {
    floorPrice: 3.5,
    totalSupply: 10000,
    owners: 5000,
  };

  const [firstTabValue, setFirstTabValue] = useState('1');

  const [secondTabValue, setSecondTabValue] = useState('4');

  const handleFirstTabChange = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setFirstTabValue(newValue);
  };

  const handleSecondTabChange = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setSecondTabValue(newValue);
  };

  return (
    <Grid container spacing={5} sx={{ mt: 5 }}>
      <Grid item xs={12} md={8}>
        <StatsCard title="Azuki Stats" data={statsData} />
        <XNftFilterComp />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6} md={4}>
            {/* <GalleryCard cardType="collection" itemId="one" /> */}
          </Grid>
          <Grid item xs={6} md={4}>
            {/* <GalleryCard cardType="collection" itemId="two" /> */}
          </Grid>
          <Grid item xs={6} md={4}>
            {/* <GalleryCard cardType="collection" itemId="three" /> */}
          </Grid>
          <Grid item xs={6} md={4}>
            {/* <GalleryCard cardType="collection" itemId="four" /> */}
          </Grid>
        </Grid>
      </Grid>
      {/* Second Column */}
      <Grid item xs={12} md={4}>
        {/* First Card */}
        <ActivityTable />
        {/* End of First Card */}
        {/* Second Card */}
        <Card dir="ltr" sx={{ mt: 5 }}>
          <CardHeader title="Analytics" />
          <CardContent>
            <TabContext value={firstTabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleFirstTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Sales" value="1" />
                  <Tab label="Traders" value="2" />
                  <Tab label="Depth" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: 0 }}>
                <SaleInfo />
              </TabPanel>
              <TabPanel value="2" sx={{ p: 0 }}>
                <TopTraders />
              </TabPanel>
              <TabPanel value="3" sx={{ p: 0 }}>
                <DepthComp />
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
        {/* End of Second Card */}
        {/* Third Card */}
        <Card dir="ltr" sx={{ mt: 5 }}>
          <CardContent>
            <TabContext value={secondTabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleSecondTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Traits" value="4" />
                  <Tab label="Filters" value="5" />
                </TabList>
              </Box>
              <TabPanel value="4" sx={{ p: 0 }}>
                <TraitsInfo />
              </TabPanel>
              <TabPanel value="5" sx={{ p: 0 }}>
                No Design on it
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
        {/* End of Third Card */}
      </Grid>
    </Grid>
  );
};

XIntoMoreCollections.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFTs | Colletions</title>c
    </Head>
    <XLayoutXNfts> {page} </XLayoutXNfts>
  </MainLayout>
);

export default XIntoMoreCollections;
