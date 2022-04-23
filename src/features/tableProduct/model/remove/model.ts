import { createEvent, forward } from 'effector';

import { IDeleteProductToTableParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const remove = createEvent<IDeleteProductToTableParams>();

forward({
  from: remove,
  to: tablesModel.deleteProductFx,
});
