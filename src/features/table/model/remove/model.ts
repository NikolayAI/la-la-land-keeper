import { createEvent, createStore, forward } from 'effector';

import { TableIdType, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const remove = createEvent<{ id: TableIdType }>();

export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.removeTableFx.finally, (state, { params: { id: tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.removeTableFx, (state, { id: tableId }) => ({
    ...state,
    [tableId]: true,
  }));

forward({
  from: remove,
  to: tablesModel.removeTableFx,
});
