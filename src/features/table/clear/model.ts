import { createEvent, forward } from 'effector';

import { tablesModel } from '@entities/tables';
import { IClearTableParams } from '@shared/api';

export const clearTable = createEvent<IClearTableParams>();

forward({
  from: clearTable,
  to: tablesModel.clearTableFx,
});
