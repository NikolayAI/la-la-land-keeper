import { createEvent, forward } from 'effector';

import { tablesModel } from '@/entities/tables';

export const create = createEvent();

forward({
  from: create,
  to: tablesModel.createTableFx,
});
