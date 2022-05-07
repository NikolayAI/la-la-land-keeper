import { createEvent, createStore, sample } from 'effector';

import { IAddProductToTableParams } from '@/shared';
import { tablesModel } from '@/entities/tables';
import { ISetAnchorElementParams } from './types';

export const add = createEvent<IAddProductToTableParams>();
export const setAnchorEl = createEvent<ISetAnchorElementParams>();

export const $anchorEl = createStore<Record<string, null | HTMLElement>>({});

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
