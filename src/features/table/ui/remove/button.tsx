import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import React, { FC } from 'react';

import { remove } from '../../model/remove';

interface IBtnProps {
  tableId: string;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <Button
    role={`remove-table-${tableId}-button`}
    startIcon={<DeleteIcon />}
    onClick={() => remove({ id: tableId })}
  >
    Удалить стол
  </Button>
);
