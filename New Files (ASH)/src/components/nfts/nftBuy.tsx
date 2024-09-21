import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  ListItemText,
  Typography,
  Box,
  FormControlLabel,
} from '@mui/material';

const XNftBuy: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <ListItemText secondary="Current Price" />
            <ListItemText
              primary="0.0007 ETH"
              secondary="$2.51"
              sx={{ display: 'flex', alignItems: 'center' }}
              secondaryTypographyProps={{ ml: 2 }}
            />
            <Box sx={{ display: 'flex' }}>
              <ListItemText secondary="Listed by " />
              <ListItemText
                secondary={
                  <Typography
                    variant="body2"
                    color="primary"
                    component="a"
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    1353756
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleDecrease} variant="outlined">
              -
            </Button>
            <Typography variant="body1" sx={{ p: 2 }}>
              {quantity}
            </Typography>
            <Button onClick={handleIncrease} variant="outlined">
              +
            </Button>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="soft" color="primary" fullWidth>
          Buy
        </Button>
        {/* <Button variant="soft" color="primary" fullWidth> */}
        {/*   Make Offer */}
        {/* </Button> */}
      </CardActions>
    </Card>
  );
};

export default XNftBuy;
