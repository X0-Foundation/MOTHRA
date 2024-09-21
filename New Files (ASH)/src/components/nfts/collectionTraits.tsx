import { useState } from 'react';
import {
  Select,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  MenuItem,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { m } from 'framer-motion';

const tempData = [
  'Attributes Count (4)',
  'Background (10)',
  'Body (13)',
  'Clothes (38)',
  'Face (15)',
  'Head (34)',
];

const TraitsInfo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
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
        <IconButton color="primary">
          <QrCodeScannerIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 3 }}>
        {tempData.map((data, index) => (
          <FormControl fullWidth sx={{ mt: 2 }} key={`selectMenu-${index}`}>
            <Typography>{data}</Typography>
            <Select
              displayEmpty
              id="demo-simple-select"
              value={0}
              variant="outlined"
            >
              <MenuItem disabled value={0}>
                <em>Selelct ...</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        ))}
      </Box>
    </>
  );
};

export default TraitsInfo;
