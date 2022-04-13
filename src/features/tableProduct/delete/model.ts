import { createEvent, forward } from 'effector';

import { IDeleteProductToTableParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const deleteProductFromTable =
  createEvent<IDeleteProductToTableParams>();

forward({
  from: deleteProductFromTable,
  to: tablesModel.deleteProductFx,
});
