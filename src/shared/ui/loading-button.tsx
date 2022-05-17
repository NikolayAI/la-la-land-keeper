import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import React from 'react';

export const StyledLoadingButton = styled(({ children, ...props }: LoadingButtonProps) => (
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
