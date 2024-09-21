import React, { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
} from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { CollectionCard } from '@/components/nfts';

const XNftMoreFromCollections = () => {
  const [name, setName] = useState('');
  return (
    <Accordion key="accordionCollection" variant="outlined" expanded>
      <AccordionSummary>
        <Typography variant="subtitle1">More From This Collection</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={6} md={4}>
            <CollectionCard itemId="one" />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default XNftMoreFromCollections;
