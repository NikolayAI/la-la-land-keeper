import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';

import { remove, $isLoading } from '../../model/remove';

interface IBtnProps {
  tableId: TableIdType;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <LoadingButton
    role={`remove-table-button-${tableId}`}
    startIcon={<DeleteIcon />}
    loading={useUnit($isLoading)?.[tableId]}
    onClick={() => {
      remove({ tableId });
    }}
  >
    Удалить стол
  </LoadingButton>
);
