import { createEvent, createStore, sample } from 'effector';

import { IRemoveTableParams, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const remove = createEvent<IRemoveTableParams>();

export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.removeTableFx.finally, (state, { params: { tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.removeTableFx, (state, { tableId }) => ({
    ...state,
    [tableId]: true,
  }));

sample({
  clock: remove,
  target: tablesModel.removeTableFx,
});
