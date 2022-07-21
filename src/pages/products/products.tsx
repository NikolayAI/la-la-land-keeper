import LoadingButton from '@mui/lab/LoadingButton';
import { useUnit } from 'effector-react';
import React from 'react';

import { productModel, ProductUI } from '@/features/product';

export const ProductsPage = () => {
  return (
    <>
      <LoadingButton
        sx={{ marginRight: '1rem' }}
        role="open-create-product-form-header-button"
        variant="contained"
        loading={useUnit(productModel.$isCreateLoading)}
        onClick={() => {
          productModel.openCreateForm();
        }}
      >
        Создать товар
      </LoadingButton>
      <LoadingButton
        role="open-remove-product-form-button"
        variant="contained"
        loading={useUnit(productModel.$isRemoveLoading)}
        onClick={(event) => {
          productModel.setRemoveAnchorEl(event.currentTarget);
        }}
      >
        Удалить товар
      </LoadingButton>
      <ProductUI.RemoveMenu />
      <ProductUI.CreateModal />
    </>
  );
};
