import { $isLoading, $products, createProductFx, getProductsFx, removeProductFx } from './model';

export * from './constants';

export const productsModel = {
  $products,
  createProductFx,
  getProductsFx,
  removeProductFx,
  $isLoading,
};
