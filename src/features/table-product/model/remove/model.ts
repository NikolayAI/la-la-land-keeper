import { createEvent, forward } from 'effector';

import { IRemoveProductToTableParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const remove = createEvent<IRemoveProductToTableParams>();

forward({
  from: remove,
  to: tablesModel.removeProductFx,
});
