import { combine, createEffect, createStore, sample } from 'effector';

import { IProduct, IRemoveProductParams, ProductsAPI, ProductsType } from '@/shared';

export const getProductsFx = createEffect<void, ProductsType, Error>();
export const createProductFx = createEffect<IProduct, void, Error>();
export const removeProductFx = createEffect<IRemoveProductParams, void, Error>();

export const $isLoading = createStore<boolean>(false);
export const $products = createStore<ProductsType>({});

getProductsFx.use(async () => {
  return await ProductsAPI.getProducts();
});
createProductFx.use(async (product) => {
  await ProductsAPI.createProduct(product);
});
removeProductFx.use(async ({ productId }) => {
  await ProductsAPI.removeProduct({ productId });
});

$isLoading.on(
  combine(getProductsFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$products.on(getProductsFx.doneData, (_, products) => products);

sample({
  clock: createProductFx.doneData,
  target: getProductsFx,
});
sample({
  clock: removeProductFx.doneData,
  target: getProductsFx,
});
