import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';
import { remove, $isLoading } from '../../model/remove';

interface IBtnProps {
  tableId: TableIdType;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <Button
    role={`remove-table-${tableId}-button`}
    startIcon={<DeleteIcon />}
    disabled={useStore($isLoading)}
    onClick={() => {
      remove({ id: tableId });
    }}
  >
    Удалить стол
  </Button>
);
