import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType } from '@/shared';
import { tableModel } from '@/features/table';
import { clear } from '../../model/clear';

interface IBtnProps {
  tableId: TableIdType;
}

export const Btn: FC<IBtnProps> = ({ tableId }) => (
  <LoadingButton
    role={`clear-table-${tableId}-button`}
    variant="contained"
    startIcon={<CleaningServicesIcon />}
    loading={useStore(tableModel.$isClearLoading)}
    onClick={() => {
      clear({ tableId });
    }}
  >
    Очистить стол
  </LoadingButton>
);
