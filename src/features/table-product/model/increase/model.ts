import { createEvent, sample } from 'effector';

import { IIncreaseTableProductParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const increase = createEvent<Omit<IIncreaseTableProductParams, 'value'>>();

sample({
  clock: increase,
  source: tablesModel.$tables,
  fn: (tables, { tableId, productId }) => ({
    tableId,
    productId,
    value: tables[tableId]?.products[productId]?.units + 1,
  }),
  target: tablesModel.increaseTableProductFx,
});
