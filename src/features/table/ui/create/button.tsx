import { useStore } from 'effector-react';
import React from 'react';

import { StyledLoadingButton } from '@/shared';
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
