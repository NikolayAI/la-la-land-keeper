import { createEffect, createEvent, createStore, forward } from 'effector';

import { IProduct, ProductsAPI, ProductsType, KeyValueType } from '@/shared';
import { defaultProduct } from '../constants';

export const setProductProperty = createEvent<KeyValueType<IProduct>>();

export const getProductsFx = createEffect<void, ProductsType, Error>();
export const createProductFx = createEffect<IProduct, void, Error>();
export const removeProductFx = createEffect<{ id: string }, void, Error>();

export const $product = createStore<IProduct>(defaultProduct);
export const $products = createStore<ProductsType>({});

getProductsFx.use(async () => await ProductsAPI.getProducts());
createProductFx.use(async (product) => {
  await ProductsAPI.createProduct(product);
});
removeProductFx.use(async ({ id }) => {
  await ProductsAPI.removeProduct({ id });
});

$product
  .on(setProductProperty, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .reset(createProductFx.doneData);
$products.on(getProductsFx.doneData, (_, products) => products);

forward({
  from: createProductFx.doneData,
  to: getProductsFx,
});
forward({
  from: removeProductFx.doneData,
  to: getProductsFx,
});
