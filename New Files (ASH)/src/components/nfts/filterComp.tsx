// React
import { useState } from 'react';
// hooks
import useResponsive from '@/hooks/useResponsive';
//  MUI components
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
// const data
import { nftFilters, nftOrdering } from '@/_mock/arrays/_nftFilters';

const XNftFilterComp = () => {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  const [filter, setFilter] = useState(0);

  const [showOrder, setShowOrder] = useState(2);

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: number,
  ) => {
    setFilter(newFilter);
  };

  const handleShowOrder = (e: SelectChangeEvent) => {
    setShowOrder(parseInt(e.target.value, 10));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Toggle Button Group for Filtering */}
      {isDesktop && (
        <ToggleButtonGroup
          value={filter}
          onChange={handleFilter}
          exclusive
          color="primary"
        >
          {nftFilters.map((option) => (
            <ToggleButton key={option.key} value={option.value}>
              {option.key}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
      {isMobile && (
        <FormControl sx={{ order: 0, minWidth: '100%' }}>
          <InputLabel>Listing</InputLabel>
          <Select
            labelId="listing-label"
            id="listing-label"
            value={filter}
            label="Listing"
            onChange={() => handleFilter}
          >
            {nftFilters.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Text Field with Search Icon */}
      <TextField
        fullWidth
        sx={{ order: isMobile ? 2 : 1, minWidth: isMobile ? '100%' : 'auto' }}
        label="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {/* Select option for Ordering */}
      <FormControl
        sx={{ minWidth: isMobile ? '100%' : 'auto', order: isMobile ? 1 : 2 }}
      >
        <InputLabel id="select-order-label">Order</InputLabel>
        <Select
          labelId="select-order-label"
          id="demo-select-small"
          value={showOrder.toString()}
          label="Category"
          variant="outlined"
          onChange={handleShowOrder}
        >
          {nftOrdering.map((order) => (
            <MenuItem value={order.value} key={`menuItem-${order.key}`}>
              {order.key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default XNftFilterComp;
