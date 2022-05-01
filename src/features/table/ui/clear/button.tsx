import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Button } from '@mui/material';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';
import { clear } from '../../model/clear';

interface IBtnProps {
  tableId: TableIdType;
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
