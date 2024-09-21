import Head from 'next/head';
// react
import React, { useState } from 'react';
// hooks
import useResponsive from '@/hooks/useResponsive';
// Layout
import MainLayout from '@/layouts/main/MainLayout';
import XLayoutXNfts from '@/layouts/main/nfts';
// Components
import {
  GalleryCard,
  XNftFilterComp,
  XNftProfileHeader,
} from '@/components/nfts';

import {
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
// const
import { nftProfileFilters } from '@/_mock/arrays/_nftFilters';
import { Search } from '@mui/icons-material';

const XNftProfile = () => {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  const [filter, setFilter] = useState(0);
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: number,
  ) => {
    setFilter(newFilter);
  };
  // @ts-ignore
  return (
    <>
      <XNftProfileHeader />
      {/* Toggle Button Group for Filtering */}
      {isDesktop && (
        <ToggleButtonGroup
          value={filter}
          onChange={handleFilter}
          exclusive
          color="primary"
          fullWidth
          sx={{ mt: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}
        >
          {nftProfileFilters.map((option) => (
            <ToggleButton key={option.key} value={option.value}>
              {option.key}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
      {/* End of Toggle */}
      {isMobile && (
        <FormControl sx={{ minWidth: '100%', mt: 2 }}>
          <InputLabel id="filter-label">Category</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-label"
            value={filter}
            label="Filter"
            variant="outlined"
            onChange={() => handleFilter}
          >
            {nftProfileFilters.map((option, index) => (
              <MenuItem value={option.value} key={option.key}>
                {option.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* XNft filter component */}
      <XNftFilterComp />
      {/* End of Xnft filter component */}
      {/* Accordion */}
      <Grid container spacing={5} sx={{ mt: 5 }}>
        <Grid item xs={12} md={3}>
          <Accordion key="accordionCollection" variant="outlined" expanded>
            <AccordionSummary>
              <Typography variant="subtitle1">Collections</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                sx={{ mx: 3, textAlign: 'center' }}
                label="Search"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <List sx={{ p: 0, mt: 2 }}>
                {collections.map((collection) => (
                  <ListItem key={collection.name} sx={{ textAlign: 'right' }}>
                    <ListItemAvatar>
                      <Avatar src={collection.imageUrl} alt={collection.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={collection.name}
                      secondary={`${collection.valueInEth} ETH`}
                    />
                    <ListItemText
                      primary={`${collection.valueInEth} ETH`}
                      secondary={`Floor ${collection.valueInEth} ETH`}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <GalleryCard cardType="nft" itemId="one" /> */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <GalleryCard cardType="nft" itemId="two" /> */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <GalleryCard cardType="nft" itemId="two" /> */}
        </Grid>
      </Grid>
      {/* End of Accordion */}
    </>
  );
};

XNftProfile.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFT | Profile</title>c
    </Head>
    <XLayoutXNfts> {page} </XLayoutXNfts>
  </MainLayout>
);

export default XNftProfile;

interface Collection {
  name: string;
  listed: string;
  imageUrl: string;
  valueInEth: number;
}

const collections: Collection[] = [
  {
    name: 'Collection 1',
    listed: '0/1',
    imageUrl: '/assets/icons/home/agency.png',
    valueInEth: 1.5,
  },
  {
    name: 'Collection 2',
    listed: '0/1',
    imageUrl: '/assets/icons/home/nfts.png',
    valueInEth: 0.5,
  },
  {
    name: 'Collection 3',
    listed: '0/1',
    imageUrl: '/assets/icons/home/trade.png',
    valueInEth: 2.5,
  },
  // Add more collection...
];
