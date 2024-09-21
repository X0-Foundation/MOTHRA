// React
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// Layouts
import MainLayout from '@/layouts/main';
import XLayoutXNfts from '@/layouts/main/nfts';
// components
import {
  ActivityTable,
  DepthComp,
  NftCard,
  TopTraders,
  SaleInfo,
  TraitsInfo,
  XNftFilterComp,
  CollectionStatsCard,
} from '@/components/nfts';
import { Grid, Box, Card, CardHeader, CardContent, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// Apollo Client and subgraph
import client from '@/utils/subgraph/apollo-client';
import { useQuery } from '@apollo/client';
import {
  CollectionCreated,
  ItemListedsOnCollection,
} from '@/utils/subgraph/queries';

const XSpecificCollectionInfo = () => {
  const [firstTabValue, setFirstTabValue] = useState('1');
  const [secondTabValue, setSecondTabValue] = useState('4');

  const router = useRouter();
  const { collectionId, ...data } = router.query;
  console.log(data);

  const {
    loading: collectionLoading,
    error: collectionError,
    data: collectionData,
  } = useQuery(CollectionCreated, {
    client,
    variables: { id: collectionId },
  });

  console.log(collectionData);
  const {
    loading: nftsLoading,
    error: nftsError,
    data: nftsData,
  } = useQuery(ItemListedsOnCollection, {
    client,
    variables: {
      collection: collectionData?.collection_address,
      first: 10,
      skip: 0,
    },
    skip: !collectionData, // Skip the query if collectionData is not available
  });

  console.log(nftsData);

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
        {/* <StatsCard title="Azuki Stats" data={statsData} /> */}
        <CollectionStatsCard />
        <XNftFilterComp />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <NftCard itemId="one" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NftCard itemId="two" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NftCard itemId="three" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NftCard itemId="four" />
          </Grid>
        </Grid>
      </Grid>
      {/* Second Column */}
      <Grid item xs={12} md={4}>
        {/* First Card */}
        {/* <ActivityTable /> */}
        {/* End of First Card */}
        {/* Second Card */}
        <Card dir="ltr" sx={{ mt: 5 }}>
          <CardHeader title="Analytics" />
          <CardContent>
            <TabContext value={firstTabValue}>
              <SaleInfo />
              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
              {/*   <TabList */}
              {/*     onChange={handleFirstTabChange} */}
              {/*     aria-label="lab API tabs example" */}
              {/*   > */}
              {/*     <Tab label="" value="1" /> */}
              {/*     /!* <Tab label="Traders" value="2" /> *!/ */}
              {/*     /!* <Tab label="Depth" value="3" /> *!/ */}
              {/*   </TabList> */}
              {/* </Box> */}
              {/* <TabPanel value="1" sx={{ p: 0 }}> */}
              {/*   <SaleInfo /> */}
              {/* </TabPanel> */}
              {/* <TabPanel value="2" sx={{ p: 0 }}> */}
              {/*   <TopTraders /> */}
              {/* </TabPanel> */}
              {/* <TabPanel value="3" sx={{ p: 0 }}> */}
              {/*   <DepthComp /> */}
              {/* </TabPanel> */}
            </TabContext>
          </CardContent>
        </Card>
        {/* End of Second Card */}
        {/* Third Card */}
        {/* TODO: Remove TRAITS and apply design to Filters */}
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

XSpecificCollectionInfo.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFT Collection</title>
    </Head>
    <XLayoutXNfts>{page}</XLayoutXNfts>
  </MainLayout>
);

export default XSpecificCollectionInfo;
