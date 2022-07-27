import { $isLoading, $products, createProductFx, getProductsFx, removeProductFx } from './model';
import { Table } from './ui/table';

export * from './constants';

export const productsModel = {
  $products,
  createProductFx,
  getProductsFx,
  removeProductFx,
  $isLoading,
};

export const ProductsUI = {
  Table,
};
