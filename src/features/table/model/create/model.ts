import { combine, createEvent, createStore, sample } from 'effector';

import { tablesModel } from '@/entities/tables';

export const create = createEvent();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.createTableFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

sample({
  clock: create,
  target: tablesModel.createTableFx,
});
