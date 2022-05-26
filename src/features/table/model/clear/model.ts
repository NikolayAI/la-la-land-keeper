import { createEvent, createStore, forward } from 'effector';

import { IClearTableParams, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const clear = createEvent<IClearTableParams>();

export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.clearTableFx.finally, (state, { params: { tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.clearTableFx, (state, { tableId }) => ({
    ...state,
    [tableId]: true,
  }));

forward({
  from: clear,
  to: tablesModel.clearTableFx,
});
