import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React from 'react';

import { $isLoading, create } from '../../model/create';

export const Btn = () => (
  <LoadingButton
    role="create-table-button"
    variant="contained"
    loading={useStore($isLoading)}
    onClick={() => {
      create();
    }}
  >
    Создать стол
  </LoadingButton>
);
