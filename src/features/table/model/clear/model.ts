import { combine, createEvent, createStore, forward } from 'effector';

import { IClearTableParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const clear = createEvent<IClearTableParams>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.clearTableFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: clear,
  to: tablesModel.clearTableFx,
});
