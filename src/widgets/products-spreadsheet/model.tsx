import LoadingButton from '@mui/lab/LoadingButton';
import { combine } from 'effector';
import React from 'react';

import { ProductIdType } from '@/shared';
import { ISpreadSheetRow, productsModel } from '@/entities/products';
import { productModel } from '@/features/product';

export const $productsTableRows = combine(
  productsModel.$products,
  productModel.$isRemoveLoading,
  (products, isRemoveLoading) => {
    const result: Record<ProductIdType, ISpreadSheetRow> = {};
    for (const productId in products) {
      result[productId] = {
        ...products[productId],
        actions: [
          <LoadingButton
            key={`remove-${productId}`}
            role={`open-remove-product-form-button-${productId}`}
            variant="contained"
            loading={isRemoveLoading[productId]}
            onClick={() => {
              productModel.removeProduct({ productId });
            }}
          >
            Удалить
          </LoadingButton>,
        ],
      };
    }
    return result;
  }
);
