import { combine, createEvent, createStore, forward } from 'effector';

import { tablesModel } from '@/entities/tables';

export const remove = createEvent<{ id: string }>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.removeTableFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: remove,
  to: tablesModel.removeTableFx,
});
