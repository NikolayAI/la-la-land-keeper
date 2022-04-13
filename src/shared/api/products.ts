import { v4 } from 'uuid';

import { IProduct, ProductsType } from './types';
import { headers } from './constants';

export const getProducts = async (): Promise<ProductsType> => {
  const response = await fetch('http://localhost:3001/products');
  return await response.json();
};

export const setProducts = async (products: ProductsType): Promise<void> => {
  await fetch('http://localhost:3001/products', {
    method: 'POST',
    body: JSON.stringify(products),
    headers,
  });
};

export const createProduct = async (product: IProduct): Promise<void> => {
  const products = await getProducts();
  const id = v4();
  products[id] = { ...product, id };
  await setProducts(products);
};

export const deleteProduct = async ({ id }: { id: string }) => {
  const products = await getProducts();
  delete products[id];
  await setProducts(products);
};
