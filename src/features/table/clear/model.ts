import { createEvent, forward } from 'effector';

import { IClearTableParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const clear = createEvent<IClearTableParams>();

forward({
  from: clear,
  to: tablesModel.clearTableFx,
});
