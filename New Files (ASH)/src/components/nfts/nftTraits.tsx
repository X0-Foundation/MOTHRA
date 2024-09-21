// React
import { useState } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  ListItemText,
  ListItem,
  CardActionArea,
  Grid,
  Box,
} from '@mui/material';
import { BarChart } from '@mui/icons-material';

const tempData = [
  {
    label: 'Experiment #',
    value: 1002,
    token: 2.1,
  },
  {
    label: 'Background',
    value: 'Green',
    token: 2.07,
  },
  {
    label: 'Frame',
    value: 'Emerald',
    token: 2.15,
  },
  {
    label: 'Nature',
    value: 'Amped',
    token: 2.05,
  },
  {
    label: 'Primary Type',
    value: 'Water',
    token: 2.13,
  },
  {
    label: 'Secondary Type',
    value: 'Fire',
    token: 2.2,
  },
  {
    label: 'Variant',
    value: 'Normal',
    token: 2.3,
  },
  {
    label: 'Level',
    value: 1,
    token: 2.1,
  },
  {
    label: 'Health',
    value: 20,
    token: 2.09,
  },
];

const XNftTraits = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader
        title="Traits"
        avatar={
          <IconButton aria-label="custom icon button">
            <BarChart fontSize="large" color="primary" />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          {tempData.map((data) => (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <ListItemText secondary={data.label} />
                  <ListItemText primary={data.value} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 4,
                    }}
                  >
                    <ListItemText primary={data.token} />
                    <Button
                      color="primary"
                      variant="soft"
                      size="small"
                      sx={{ float: 'left' }}
                    >
                      _ _%
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default XNftTraits;
