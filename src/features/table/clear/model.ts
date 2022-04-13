import { createEvent, forward } from 'effector';

import { IClearTableParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const clearTable = createEvent<IClearTableParams>();

forward({
  from: clearTable,
  to: tablesModel.clearTableFx,
});
