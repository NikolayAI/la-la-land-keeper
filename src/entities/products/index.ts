import { $isLoading, $products, createProductFx, getProductsFx, removeProductFx, $productsIds } from './model';
import { Table } from './ui/table';

export { sortProductsByOrder } from './lib';
export * from './constants';

export const productsModel = {
  $products,
  createProductFx,
  getProductsFx,
  removeProductFx,
  $isLoading,
  $productsIds,
};

export const ProductsUI = {
  Table,
};
