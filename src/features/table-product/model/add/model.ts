import { combine, createEvent, createStore, sample } from 'effector';

import { IAddProductToTableParams } from '@/shared';
import { tablesModel } from '@/entities/tables';
import { ISetAnchorElementParams } from './types';

export const add = createEvent<IAddProductToTableParams>();
export const setAddAnchorEl = createEvent<ISetAnchorElementParams>();

export const $isLoading = createStore<boolean>(false);
export const $anchorEl = createStore<Record<string, null | HTMLElement>>({});

$isLoading.on(
  combine(tablesModel.addProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$anchorEl.on(setAddAnchorEl, (state, { tableId, element }) => ({
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
