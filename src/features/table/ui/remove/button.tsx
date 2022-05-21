import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';
import { remove, $isLoading } from '../../model/remove';

interface IBtnProps {
  tableId: TableIdType;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <LoadingButton
    sx={{}}
    role={`remove-table-${tableId}-button`}
    startIcon={<DeleteIcon />}
    loading={useStore($isLoading)}
    onClick={() => {
      remove({ id: tableId });
    }}
  >
    Удалить стол
  </LoadingButton>
);
