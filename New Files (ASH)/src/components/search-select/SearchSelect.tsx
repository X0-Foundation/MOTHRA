import React, { useState } from 'react';
import { Box, InputBase, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/system';
// const data
import { nftCategories } from '@/_mock/arrays/_nftCategories';
// Styled components using MUI's 'styled' utility
const SearchSelectContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  margin: 0,
  backgroundColor: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  display: 'block',
  borderRadius: 7,
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
  '&:focus': {
    backgroundColor: 'black', // Keep the background color consistent on focus
  },
  '& .MuiSelect-icon': {
    display: 'none', // Hide the down arrow icon
  },
}));

const CustomSearchSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState(10);

  return (
    <SearchSelectContainer>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <StyledSelect
          key="styledSelectForCategory"
          labelId="simple-select-label"
          id="simple-select"
          value={selectedOption}
          onChange={(e: any) => setSelectedOption(e.target.value)}
          disableUnderline
        >
          {nftCategories.map((category, index) => (
            <MenuItem value={category.value} key={`nftCategory${index}`}>
              {category.title}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </SearchSelectContainer>
  );
};

export default CustomSearchSelect;
