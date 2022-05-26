import { createEvent, createStore, sample } from 'effector';

import { IDecreaseTableProductParams, TablesProductLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const decrease = createEvent<Omit<IDecreaseTableProductParams, 'value'>>();

export const $isLoading = createStore<TablesProductLoadingType>({});

$isLoading
  .on(tablesModel.decreaseProductFx.finally, (state, { params: { tableId, productId } }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: false,
    },
  }))
  .on(tablesModel.decreaseProductFx, (state, { tableId, productId }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: true,
    },
  }));

sample({
  clock: decrease,
  source: tablesModel.$tables,
  fn: (tables, { tableId, productId }) => ({
    tableId,
    productId,
    value: tables[tableId]?.products[productId]?.units - 1,
  }),
  target: tablesModel.decreaseProductFx,
});
