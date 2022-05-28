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
    role={`remove-table-button-${tableId}`}
    startIcon={<DeleteIcon />}
    loading={useStore($isLoading)?.[tableId]}
    onClick={() => {
      remove({ id: tableId });
    }}
  >
    Удалить стол
  </LoadingButton>
);
