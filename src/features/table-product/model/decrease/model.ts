import { createEvent, sample } from 'effector';

import { IDecreaseTableProductParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const decrease =
  createEvent<Omit<IDecreaseTableProductParams, 'value'>>();

sample({
  clock: decrease,
  source: tablesModel.$tables,
  fn: (tables, { tableId, productId }) => ({
    tableId,
    productId,
    value: tables[tableId]?.products[productId]?.units - 1,
  }),
  target: tablesModel.decreaseTableProductFx,
});
