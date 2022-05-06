import { createEffect, createStore, forward } from 'effector';

import { IProduct, ProductsAPI, ProductsType } from '@/shared';

export const getProductsFx = createEffect<void, ProductsType, Error>();
export const createProductFx = createEffect<IProduct, void, Error>();
export const removeProductFx = createEffect<{ id: string }, void, Error>();

export const $products = createStore<ProductsType>({});

getProductsFx.use(async () => await ProductsAPI.getProducts());
createProductFx.use(async (product) => {
  await ProductsAPI.createProduct(product);
});
removeProductFx.use(async ({ id }) => {
  await ProductsAPI.removeProduct({ id });
});

$products.on(getProductsFx.doneData, (_, products) => products);

forward({
  from: createProductFx.doneData,
  to: getProductsFx,
});
forward({
  from: removeProductFx.doneData,
  to: getProductsFx,
});
