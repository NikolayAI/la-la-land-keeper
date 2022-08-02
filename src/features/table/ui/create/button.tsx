import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { $isLoading, create } from '../../model/create';

interface IBtnProps {
  className?: string;
}

export const Btn: FC<IBtnProps> = ({ className }) => (
  <LoadingButton
    className={`create-table__button ${className}`}
    sx={{ marginBottom: '1.5rem' }}
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
