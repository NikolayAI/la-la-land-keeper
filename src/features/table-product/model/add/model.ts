import { createEvent, createStore, sample } from 'effector';

import { IAddProductToTableParams, TablesLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';
import { ISetAnchorElementParams } from './types';

export const add = createEvent<IAddProductToTableParams>();
export const setAnchorEl = createEvent<ISetAnchorElementParams>();

export const $anchorEl = createStore<Record<string, null | HTMLElement>>({});
export const $isLoading = createStore<TablesLoadingType>({});

$isLoading
  .on(tablesModel.addProductFx.finally, (state, { params: { tableId } }) => ({
    ...state,
    [tableId]: false,
  }))
  .on(tablesModel.addProductFx, (state, { tableId }) => ({
    ...state,
    [tableId]: true,
  }));
$anchorEl.on(setAnchorEl, (state, { tableId, element }) => ({
  ...state,
  [tableId]: element,
}));

sample({
  clock: add,
  source: tablesModel.$tables,
  filter: (tables, { tableId, productId }) => {
    return !tables[tableId]?.products[productId]?.createdAt;
  },
  fn: (_, clockPayload) => clockPayload,
  target: tablesModel.addProductFx,
});
