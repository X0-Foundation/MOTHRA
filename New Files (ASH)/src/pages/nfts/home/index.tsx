import React, { useEffect, useMemo, useState } from 'react';
// next
import Head from 'next/head';
import { MotionViewport } from '@/components/animate';
import { StyledRoot } from '@/layouts/login/styles';
// MUI
import {
  Container,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Button,
  ButtonGroup,
} from '@mui/material';
// Layout
import XLayoutXNfts from '@/layouts/main/nfts';
import MainLayout from '@/layouts/main/MainLayout';
// components
import { CollectionCard, CollectionCarousel, NftCard } from '@/components/nfts';
// const Data
import { timeIntervals } from '@/_mock/arrays';
// apollo client and subgraph
import { CollectionCreateds, ItemListeds } from '@/utils/subgraph/queries';
import client from '@/utils/subgraph/apollo-client';
import { Observable } from '@apollo/client';
import useResponsive from '@/hooks/useResponsive';
// Moralis
import { getNFTMetaData } from '@/utils/nftUtils';

// CollectionCreateds Observable
export const collectionsObservable = new Observable((observer) => {
  client
    .query({
      query: CollectionCreateds,
      variables: { first: 10, skip: 0 },
    })
    .then((response) => {
      observer.next(response.data);
    })
    .catch((error) => {
      observer.error(error);
    });
});

// ItemListeds Observable
export const itemListedsObservable = new Observable((observer) => {
  client
    .query({
      query: ItemListeds,
      variables: { first: 10, skip: 0 },
    })
    .then((response) => {
      observer.next(response.data);
    })
    .catch((error) => {
      observer.error(error);
    });
});

const XNftHome = () => {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');
  const [trending, setTrending] = useState('top');
  const [period, setPeriod] = useState(1);
  const [unit, setUnit] = useState('Avax');

  const [collections, setCollections] = useState();
  const [listedNfts, setListedNfts] = useState<any>([]);

  useEffect(() => {
    const collectionsSubscription = collectionsObservable.subscribe(
      (result: any) => {
        console.log(result);
        setCollections(result); // This will trigger the next useEffect
      },
      (error) => {
        console.log(error);
      },
    );

    const nftsSubscription = itemListedsObservable.subscribe(
      async (result: any) => {
        console.log(result.itemListeds);
        if (result.itemListeds) {
          await Promise.all(
            result.itemListeds.map(async (data: any) => {
              try {
                const metaData = await getNFTMetaData(
                  data.collection,
                  data.token_id,
                );
                return JSON.parse(metaData.raw.metadata);
              } catch (error) {
                console.log('Moralis Error: ', error);
                return null; // Return null or handle the error appropriately
              }
            }),
          )
            .then((newNfts) => {
              setListedNfts(newNfts);
              console.log(listedNfts);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('Error while Moralis getNftMetaData');
        }
      },
      (error) => {
        console.log(error);
      },
    );

    return () => {
      collectionsSubscription.unsubscribe();
      nftsSubscription.unsubscribe();
    };
  }, []);

  const handleTrending = (
    e: React.MouseEvent<HTMLElement>,
    newTrending: string,
  ) => {
    setTrending(newTrending);
  };

  const handlePeriod = (
    e: React.MouseEvent<HTMLElement>,
    newPeriod: number,
  ) => {
    setPeriod(newPeriod);
  };

  const handleUnit = (e: React.MouseEvent<HTMLElement>, newUnit: string) => {
    setUnit(newUnit);
  };

  return (
    <>
      <CollectionCarousel />
      <StyledRoot>
        <Container component={MotionViewport} sx={{ py: 5, mt: 3 }}>
          {/* TODO: make this as component */}
          {/* Toggle First Button Group */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <ToggleButtonGroup
              color="primary"
              value={trending}
              exclusive
              aria-label="Platform"
              onChange={handleTrending}
            >
              <ToggleButton value="trending">Trending</ToggleButton>
              <ToggleButton value="top">Top</ToggleButton>
            </ToggleButtonGroup>

            {isDesktop && (
              <ToggleButtonGroup
                color="primary"
                value={period}
                exclusive
                aria-label="Platform"
                onChange={handlePeriod}
              >
                {timeIntervals.map((timeInterval, index) => (
                  <ToggleButton value={timeInterval.value} key={`key-${index}`}>
                    {timeInterval.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
            {isMobile && (
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="category-label">Hours</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-label"
                  value="1"
                  label="Hours"
                  variant="outlined"
                  sx={{ textAlign: 'center' }}
                >
                  {timeIntervals.map((timeInterval, index) => (
                    <MenuItem value={timeInterval.value} key={`key-${index}`}>
                      {timeInterval.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <ToggleButtonGroup
              color="primary"
              value={unit}
              exclusive
              aria-label="Platform"
              onChange={handleUnit}
            >
              <ToggleButton value="usd">USD</ToggleButton>
              <ToggleButton value="ftm">FTM</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {/*   End of Toggle Button Group */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
              mt: 2,
            }}
          />
          {/* Beginning of Collections */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ py: 2 }}>
              Collections
            </Typography>
            <Grid container spacing={5}>
              {/* {!collectionLoading &&
                collections?.collectionCreateds.map(
                  (collection: any, index: number) => (
                    <Grid item xs={12} md={4} key={`clisted-${index}`}>
                      <CollectionCard
                        itemId={collection.id}
                        data={collection}
                      />
                    </Grid>
                  ),
                )}
              {collectionError && (
                <Typography variant="h4" sx={{ py: 2 }}>
                  No Collections
                </Typography>
              )} */}
            </Grid>
          </Box>
          {/* End of Collections */}
          {/* Beginning of nfts */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ py: 2 }}>
              NFTs
            </Typography>
            <Grid container spacing={5}>
              {/* TODO: collection and nftItem Type definition */}
              {/* {!nftLoading &&
                nftData?.itemListeds.map((nftItem: any, index: number) => (
                  <Grid item xs={12} md={4} key={`gn-${index}`}>
                    <NftCard itemId="one" data={nftItem} />
                  </Grid>
                ))}
              {nftError && (
                <Typography variant="h4" sx={{ py: 2 }}>
                  No Nfts Listed
                </Typography>
              )} */}
            </Grid>
          </Box>
          {/* End of nfts */}
          {/* Beginning of new collections */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ py: 2 }}>
              New Collections
            </Typography>
            <ButtonGroup
              key="newCollectionBtnG"
              variant="soft"
              color="primary"
              size="large"
            >
              <Button color="primary">Create</Button>
              <Button color="primary">Import</Button>
            </ButtonGroup>
            <Grid container spacing={5} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <CollectionCard itemId="two" key="demo-1" />
              </Grid>
            </Grid>
          </Box>
          {/* End of new collections */}
          {/* Beginning of latest sales */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{ py: 2 }}>
              Last Sales
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <NftCard itemId="two" key="demo-2" />
              </Grid>
            </Grid>
          </Box>
          {/*  End of latest sales  */}
        </Container>
      </StyledRoot>
    </>
  );
};

XNftHome.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFTs | Explore</title>
    </Head>
    <XLayoutXNfts> {page} </XLayoutXNfts>
  </MainLayout>
);

export default XNftHome;
