import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import MainLayout from '@/layouts/main';
import Head from 'next/head';
import XLayoutXNfts from '@/layouts/main/nfts';
import useResponsive from '@/hooks/useResponsive';
import { nftCategories } from '@/_mock/arrays/_nftCategories';
import { XCollectionList } from '@/components/nfts';

const XNftExplore = () => {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  const [showFilters, setShowFilters] = useState(false);

  const [sliderValue, setSliderValue] = useState<number[]>([20, 50]);

  const [trending, setTrending] = useState('top');

  const [period, setPeriod] = useState('day');

  const [unit, setUnit] = useState('avax');

  const [categoryValue, setCategoryValue] = useState(1);

  const handleTrending = (
    e: React.MouseEvent<HTMLElement>,
    newTrending: string,
  ) => {
    setTrending(newTrending);
  };

  const handlePeriod = (
    e: React.MouseEvent<HTMLElement>,
    newPeriod: string,
  ) => {
    setPeriod(newPeriod);
  };

  const handleUnit = (e: React.MouseEvent<HTMLElement>, newUnit: string) => {
    setUnit(newUnit);
  };

  const toggleSliderFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue([newValue, sliderValue[1]]);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue([sliderValue[0], newValue]);
  };

  const handleCategory = (e: SelectChangeEvent) => {
    setCategoryValue(parseInt(e.target.value, 10) as number);
  };
  return (
    <>
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
          <ToggleButton value="new">New</ToggleButton>
        </ToggleButtonGroup>

        {isDesktop && (
          <ToggleButtonGroup
            color="primary"
            value={period}
            exclusive
            aria-label="Platform"
            onChange={handlePeriod}
          >
            <ToggleButton value="one">1h</ToggleButton>
            <ToggleButton value="six">6h</ToggleButton>
            <ToggleButton value="day">24h</ToggleButton>
            <ToggleButton value="seven">7d</ToggleButton>
            <ToggleButton value="thirty">30d</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
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
              <MenuItem value="1" key="hours-1">
                1h
              </MenuItem>
              <MenuItem value="6" key="hours-6">
                6h
              </MenuItem>
              <MenuItem value="24" key="hours-24">
                24h
              </MenuItem>
              <MenuItem value="7" key="hours-7">
                7d
              </MenuItem>
              <MenuItem value="30" key="hours-30">
                30D
              </MenuItem>
              <MenuItem value="0" key="hours-0">
                All
              </MenuItem>
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
          <ToggleButton value="avax">AVAX</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          mt: 3,
        }}
      >
        {/* TODO: make this as component */}
        {/* Filter Button */}
        <Box sx={{ position: 'relative' }} alignItems="center" display="flex">
          <Button
            variant="soft"
            color="primary"
            size="large"
            startIcon={<FilterListIcon />}
            onClick={toggleSliderFilters}
          >
            Filter
          </Button>
          {showFilters && (
            <Paper
              sx={{
                position: 'absolute',
                top: '50px',
                width: '300px',
                padding: '20px',
                zIndex: 1,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Filter Options</Typography>
                <IconButton onClick={toggleSliderFilters}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Floor Price
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    label="Min Value"
                    type="number"
                    value={sliderValue[0]}
                    onChange={handleMinInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    label="Max Value"
                    type="number"
                    value={sliderValue[1]}
                    onChange={handleMaxInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Volume
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    label="Min Value"
                    type="number"
                    value={sliderValue[0]}
                    onChange={handleMinInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    label="Max Value"
                    type="number"
                    value={sliderValue[1]}
                    onChange={handleMaxInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Volume Changes
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    label="Min Value"
                    type="number"
                    value={sliderValue[0]}
                    onChange={handleMinInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    label="Max Value"
                    type="number"
                    value={sliderValue[1]}
                    onChange={handleMaxInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Sales
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    label="Min Value"
                    type="number"
                    value={sliderValue[0]}
                    onChange={handleMinInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    label="Max Value"
                    type="number"
                    value={sliderValue[1]}
                    onChange={handleMaxInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Unique owner ratio
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <TextField
                    label="Min Value"
                    type="number"
                    value={sliderValue[0]}
                    onChange={handleMinInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                  <TextField
                    label="Max Value"
                    type="number"
                    value={sliderValue[1]}
                    onChange={handleMaxInputChange}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1 }}
                  />
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
        {/* End of filter button */}
        {/* Search Input with search icon Beginning */}
        <TextField
          sx={{ flexGrow: 1 }}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* End of Search Input */}

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-label"
            value={categoryValue.toString()}
            label="Category"
            variant="outlined"
            onChange={handleCategory}
            sx={{ textAlign: 'center' }}
          >
            {nftCategories.map((category, index) => (
              <MenuItem value={category.value} key={index}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ my: 3 }}>
        <XCollectionList />
      </Box>
    </>
  );
};

XNftExplore.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>NFTs | Explore</title>
    </Head>
    <XLayoutXNfts> {page} </XLayoutXNfts>
  </MainLayout>
);

export default XNftExplore;
