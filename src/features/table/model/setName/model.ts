import { createEvent, createStore, forward } from 'effector';

import { ISetTableNameParams, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const setName = createEvent<ISetTableNameParams>();

export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.setNameFx.finally, (state, { params: { id: tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.setNameFx, (state, { id: tableId }) => ({
    ...state,
    [tableId]: true,
  }));

forward({
  from: setName,
  to: tablesModel.setNameFx,
});
