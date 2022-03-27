import { createEvent, sample } from 'effector';

import { tablesModel } from 'entities/tables';
import { IDecreaseTableProductParams } from 'shared/api';

export const decreaseTableProduct = createEvent<Omit<IDecreaseTableProductParams, 'value'>>();

sample({
  clock: decreaseTableProduct,
  source: tablesModel.$tables,
  fn: (tables, {tableId, productId}) => ({
    tableId,
    productId,
    value: tables[tableId]?.products[productId]?.units - 1,
  }),
  target: tablesModel.decreaseTableProductFx,
});