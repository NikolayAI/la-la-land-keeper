import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';

import { $isLoading, clear } from '../../model/clear';

interface IBtnProps {
  tableId: TableIdType;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <LoadingButton
    role={`clear-table-button-${tableId}`}
    variant="contained"
    startIcon={<CleaningServicesIcon />}
    loading={useUnit($isLoading)?.[tableId]}
    onClick={() => {
      clear({ tableId });
    }}
  >
    Очистить стол
  </LoadingButton>
);
