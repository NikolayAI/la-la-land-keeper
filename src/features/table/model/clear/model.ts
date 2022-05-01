import { createEvent, forward } from 'effector';

import { IClearTableParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const clear = createEvent<IClearTableParams>();

forward({
  from: clear,
  to: tablesModel.clearTableFx,
});
