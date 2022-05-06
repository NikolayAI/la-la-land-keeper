import {
  createProductFx,
  getProductsFx,
  removeProductFx,
  $products,
} from './model';
import { ProductCard } from './ui';

export * from './constants';

export const productsModel = {
  $products,
  createProductFx,
  getProductsFx,
  removeProductFx,
};

export const ProductsUI = {
  ProductCard,
};
