import { createEvent, createStore, forward, sample } from 'effector';

import { productsModel } from 'entities/products';

export const $isOpenCreateProductModal = createStore<boolean>(false);

export const openCreateProductModal = createEvent<void>();
export const closeCreateProductModal = createEvent<void>();
export const createProduct = createEvent<void>();

$isOpenCreateProductModal
  .on(openCreateProductModal, (_, __) => true)
  .on(closeCreateProductModal, (_, __) => false);

forward({
  from: productsModel.createProductFx.doneData,
  to: closeCreateProductModal,
});

sample({
  clock: createProduct,
  source: productsModel.$product,
  target: productsModel.createProductFx,
});
