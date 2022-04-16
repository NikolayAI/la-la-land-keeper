import { Button } from '@mui/material';
import React from 'react';

import { create } from './model';

export const Btn = () => (
  <Button
    role="create-table-header-button"
    variant="contained"
    sx={{
      my: 2,
      color: 'white',
      display: 'block',
      border: '1px solid white',
      marginRight: 4,
    }}
    onClick={() => create()}
  >
    Создать стол
  </Button>
);
