import LoadingButton from '@mui/lab/LoadingButton';
import { useUnit } from 'effector-react';
import React from 'react';

import { $isLoading, create } from '../../model/create';

export const Btn = () => (
  <LoadingButton
    role="create-table-button"
    variant="contained"
    loading={useUnit($isLoading)}
    onClick={() => {
      create();
    }}
  >
    Создать стол
  </LoadingButton>
);
