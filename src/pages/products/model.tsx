import LoadingButton from '@mui/lab/LoadingButton';
import { combine, sample } from 'effector';
import React from 'react';

import { productsRoute } from '@/shared';
import { productsModel } from '@/entities/products';
import { productModel } from '@/features/product';

export const $productsTableRows = combine(
  productsModel.$products,
  productModel.$isRemoveLoading,
  (products, isRemoveLoading) => {
    return Object.values(products).map((product) => ({
      ...product,
      actions: [
        <LoadingButton
          key={`remove-${product.id}`}
          role="open-remove-product-form-button"
          variant="contained"
          loading={isRemoveLoading[product.id]}
          onClick={() => {
            productModel.removeProduct({ productId: product.id });
          }}
        >
          Удалить
        </LoadingButton>,
      ],
    }));
  }
);

sample({
  clock: productsRoute.$isOpened,
  filter: productsRoute.$isOpened,
  target: productsModel.getProductsFx,
});
