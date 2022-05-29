import { $isLoading, $products, createProductFx, getProductsFx, removeProductFx } from './model';
import { ProductCard, ProductTimer } from './ui';

export * from './constants';

export const productsModel = {
  $products,
  createProductFx,
  getProductsFx,
  removeProductFx,
  $isLoading,
};

export const ProductsUI = {
  ProductCard,
  ProductTimer,
};
