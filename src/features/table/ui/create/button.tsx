import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { useStore } from 'effector-react';
import React from 'react';

import { $isLoading, create } from '../../model/create';

export const Btn = () => {
  const isLoading = useStore($isLoading);
  return (
    <StyledLoadingButton
      role="create-table-header-button"
      variant="contained"
      loading={isLoading}
      onClick={() => {
        create();
      }}
    >
      Создать стол
    </StyledLoadingButton>
  );
};

const StyledLoadingButton = styled(({ children, ...props }: LoadingButtonProps) => (
  <LoadingButton
    sx={{
      my: 2,
      color: 'white',
      display: 'block',
      border: '1px solid white',
      marginRight: 4,
    }}
    {...props}
  >
    {children}
  </LoadingButton>
))(() => ({
  '& .MuiLoadingButton-loadingIndicator': {
    top: '25%',
  },
}));
