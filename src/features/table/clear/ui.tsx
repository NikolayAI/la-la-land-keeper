import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Button } from '@mui/material';
import React, { FC } from 'react';

import { clear } from './model';

interface IBtnProps {
  tableId: string;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <Button
    role={`clear-table-${tableId}-button`}
    variant="contained"
    startIcon={<CleaningServicesIcon />}
    onClick={() => {
      clear({ tableId });
    }}
  >
    Очистить стол
  </Button>
);
