import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React from 'react';
import { productModel, ProductUI } from '@/features/product';

import { ProductsSpreadsheet } from '@/widgets/products-spreadsheet';

export const ProductsPage = () => (
  <>
    <LoadingButton
      sx={{ marginRight: '1rem', marginBottom: '1.5rem' }}
      role="open-create-product-form-button"
      variant="contained"
      loading={useStore(productModel.$isCreateLoading)}
      onClick={() => {
        productModel.openCreateForm();
      }}
    >
      Создать товар
    </LoadingButton>
    <ProductsSpreadsheet />
    <ProductUI.CreateModal />
  </>
);
