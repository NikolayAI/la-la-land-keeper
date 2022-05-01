import { createEvent, createStore, forward, sample } from 'effector';

import { productsModel } from '@/entities/products';

export const $isModalOpen = createStore<boolean>(false);

export const create = createEvent<void>();
export const openModal = createEvent<void>();
export const closeModal = createEvent<void>();

$isModalOpen.on(openModal, (_, __) => true).on(closeModal, (_, __) => false);

forward({
  from: productsModel.createProductFx.doneData,
  to: closeModal,
});

sample({
  clock: create,
  source: productsModel.$product,
  target: productsModel.createProductFx,
});
