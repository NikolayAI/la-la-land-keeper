import { createEffect, createEvent, createStore, forward } from 'effector';

import { defaultProduct } from './constants';
import { IProduct, ProductsAPI, ProductsType } from 'shared/api';
import { KeyValueType } from 'shared/types';

export const setProductProperty = createEvent<KeyValueType<IProduct>>();

export const getProductsFx = createEffect<void, ProductsType, Error>();
export const createProductFx = createEffect<IProduct, void, Error>();
export const deleteProductFx = createEffect<{ id: string }, void, Error>();

export const $product = createStore<IProduct>(defaultProduct);
export const $products = createStore<ProductsType>({});

getProductsFx.use(async () => {
  return await ProductsAPI.getProducts();
});
createProductFx.use(async (product) => {
  await ProductsAPI.createProduct(product);
});
deleteProductFx.use(async ({ id }) => {
  await ProductsAPI.deleteProduct({ id });
});

$product
  .on(setProductProperty, (state, { key, value }) => {
    return { ...state, [key]: value };
  })
  .reset(createProductFx.doneData);
$products.on(getProductsFx.doneData, (_, products) => products);

forward({
  from: createProductFx.doneData,
  to: getProductsFx,
});
forward({
  from: deleteProductFx.doneData,
  to: getProductsFx,
});
