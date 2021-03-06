import { v4 } from 'uuid';

import { HttpClient } from '../lib';
import { IProduct, IRemoveProductParams, ProductsType } from '../types';
import { headers } from './constants';

export const getProducts = async (): Promise<ProductsType> => {
  const { data } = await HttpClient.get({ url: '/products' });
  return data;
};

export const setProducts = async (products: ProductsType): Promise<void> => {
  await HttpClient.post({
    url: '/products',
    data: products,
    config: { headers },
  });
};

export const createProduct = async (product: IProduct): Promise<void> => {
  const products = await getProducts();
  const id = v4();
  products[id] = { ...product, id };
  await setProducts(products);
};

export const removeProduct = async ({ productId }: IRemoveProductParams) => {
  const products = await getProducts();
  delete products[productId];
  await setProducts(products);
};
