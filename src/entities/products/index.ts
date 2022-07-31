import { $isLoading, $products, createProductFx, getProductsFx, removeProductFx, $productsIds } from './model';
import { SpreadSheetRow } from './ui/spreadsheet';

export type { ISpreadSheetRow } from './ui/spreadsheet';
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
  SpreadSheetRow,
};
