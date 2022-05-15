import { createEvent, forward } from 'effector';

import { ISetTableNameParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const setName = createEvent<ISetTableNameParams>();

forward({
  from: setName,
  to: tablesModel.setNameFx,
});
