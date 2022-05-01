import { createEvent, forward } from 'effector';

import { tablesModel } from '@/entities/tables';

export const remove = createEvent<{ id: string }>();

forward({
  from: remove,
  to: tablesModel.removeTableFx,
});
