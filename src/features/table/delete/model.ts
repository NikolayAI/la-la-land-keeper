import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';

export const deleteTable = createEvent<{ id: string }>();

forward({
  from: deleteTable,
  to: tablesModel.deleteTableFx,
});
