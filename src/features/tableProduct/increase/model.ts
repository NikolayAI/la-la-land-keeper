import { createEvent, sample } from 'effector';

import { IIncreaseTableProductParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const increaseTableProduct =
  createEvent<Omit<IIncreaseTableProductParams, 'value'>>();

sample({
  clock: increaseTableProduct,
  source: tablesModel.$tables,
  fn: (tables, { tableId, productId }) => ({
    tableId,
    productId,
    value: tables[tableId]?.products[productId]?.units + 1,
  }),
  target: tablesModel.increaseTableProductFx,
});
