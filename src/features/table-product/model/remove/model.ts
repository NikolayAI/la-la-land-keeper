import { combine, createEvent, createStore, forward } from 'effector';

import { IRemoveProductToTableParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const remove = createEvent<IRemoveProductToTableParams>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.removeProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: remove,
  to: tablesModel.removeProductFx,
});
