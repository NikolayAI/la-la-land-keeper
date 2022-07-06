import { createEvent, createStore, sample } from 'effector';

import { ISetTableNameParams, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const setName = createEvent<ISetTableNameParams>();

export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.setNameFx.finally, (state, { params: { tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.setNameFx, (state, { tableId }) => ({
    ...state,
    [tableId]: true,
  }));

sample({
  clock: setName,
  target: tablesModel.setNameFx,
});
