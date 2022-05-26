import { createEvent, createStore, forward } from 'effector';

import { IRemoveProductToTableParams, TablesProductLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const remove = createEvent<IRemoveProductToTableParams>();

export const $isLoading = createStore<TablesProductLoadingType>({});

$isLoading
  .on(tablesModel.removeProductFx.finally, (state, { params: { tableId, productId } }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: false,
    },
  }))
  .on(tablesModel.removeProductFx, (state, { tableId, productId }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: true,
    },
  }));

forward({
  from: remove,
  to: tablesModel.removeProductFx,
});
