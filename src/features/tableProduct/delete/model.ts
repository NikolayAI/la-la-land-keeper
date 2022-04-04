import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { IDeleteProductToTableParams } from 'shared/api';

export const deleteProductFromTable =
  createEvent<IDeleteProductToTableParams>();

forward({
  from: deleteProductFromTable,
  to: tablesModel.deleteProductFx,
});
