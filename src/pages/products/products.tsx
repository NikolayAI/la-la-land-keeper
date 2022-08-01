import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React from 'react';
import { productModel, ProductUI } from '@/features/product';

import { ProductsSpreadsheet } from '@/widgets/products-spreadsheet';

export const ProductsPage = () => (
  <>
    <div className="products-page__actions">
      <LoadingButton
        className="products-page__button products-page__button_create"
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
    </div>
    <ProductsSpreadsheet className="products-page__spreadsheet" />
    <ProductUI.CreateModal className="products-page__create-product-modal" />
  </>
);
