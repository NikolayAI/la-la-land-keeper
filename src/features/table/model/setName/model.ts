import { combine, createEvent, createStore, forward } from 'effector';

import { ISetTableNameParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const setName = createEvent<ISetTableNameParams>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.setNameFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: setName,
  to: tablesModel.setNameFx,
});
