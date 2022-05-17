import { combine, createEvent, createStore, forward, sample } from 'effector';

import { IProduct, KeyValueType } from '@/shared';
import { defaultProduct, productsModel } from '@/entities/products';

export const setProperty = createEvent<KeyValueType<IProduct>>();
export const create = createEvent<void>();
export const openCreateForm = createEvent<void>();
export const closeModal = createEvent<void>();

export const $isLoading = createStore<boolean>(false);
export const $isModalOpen = createStore<boolean>(false);
export const $product = createStore<IProduct>(defaultProduct);

$isLoading.on(
  combine(productsModel.createProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$isModalOpen.on(openCreateForm, (_, __) => true).on(closeModal, (_, __) => false);
$product
  .on(setProperty, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .reset(productsModel.createProductFx.doneData);

forward({
  from: productsModel.createProductFx.doneData,
  to: closeModal,
});

sample({
  clock: create,
  source: $product,
  target: productsModel.createProductFx,
});
