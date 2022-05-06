import { createEvent, createStore, forward, sample } from 'effector';

import { IProduct, KeyValueType } from '@/shared';
import { defaultProduct, productsModel } from '@/entities/products';

export const $isModalOpen = createStore<boolean>(false);
export const $product = createStore<IProduct>(defaultProduct);

export const setProperty = createEvent<KeyValueType<IProduct>>();
export const create = createEvent<void>();
export const openModal = createEvent<void>();
export const closeModal = createEvent<void>();

$isModalOpen.on(openModal, (_, __) => true).on(closeModal, (_, __) => false);
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
