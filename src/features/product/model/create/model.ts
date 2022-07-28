import { combine, createEvent, createStore, sample } from 'effector';

import { IProduct, KeyValueType } from '@/shared';
import { productsModel } from '@/entities/products';

export const setProperty = createEvent<KeyValueType<IProduct>>();
export const create = createEvent<void>();
export const openCreateForm = createEvent<void>();
export const closeCreateForm = createEvent<void>();

export const $isLoading = createStore<boolean>(false);
export const $isModalOpen = createStore<boolean>(false);
export const $product = createStore<IProduct>({
  id: '',
  name: '',
  price: 0,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
});

$isLoading.on(
  combine(productsModel.createProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$isModalOpen.on(openCreateForm, (_, __) => true).on(closeCreateForm, (_, __) => false);
$product
  .on(setProperty, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .reset(productsModel.createProductFx.doneData);

sample({
  clock: productsModel.createProductFx.doneData,
  target: closeCreateForm,
});

sample({
  clock: create,
  source: $product,
  target: productsModel.createProductFx,
});
