import { combine, createEvent, createStore, sample } from 'effector';

import { IDecreaseTableProductParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const decrease = createEvent<Omit<IDecreaseTableProductParams, 'value'>>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.decreaseProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

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
