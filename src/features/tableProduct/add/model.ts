import { createEvent, createStore, sample } from 'effector';

import { ISetAnchorElementParams } from './types';
import { tablesModel } from '../../../entities/tables';
import { IAddProductToTableParams } from '../../../shared/api';

export const addProductToTable = createEvent<IAddProductToTableParams>();
export const setAnchorEl = createEvent<ISetAnchorElementParams>();

export const $anchorEl = createStore<Record<string, null | HTMLElement>>({});

$anchorEl.on(setAnchorEl, (state, { tableId, element }) => {
  return {
    ...state,
    [tableId]: element,
  };
});

sample({
  clock: addProductToTable,
  source: tablesModel.$tables,
  filter: (tables, { tableId, productId }) => {
    return !Boolean(tables[tableId]?.products[productId]?.createdAt);
  },
  fn: (_, clockPayload) => clockPayload,
  target: tablesModel.addProductFx,
});