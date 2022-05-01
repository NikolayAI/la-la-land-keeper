import { createEvent, forward } from 'effector';

import { ISetTableTitleParams } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const setTitle = createEvent<ISetTableTitleParams>();

forward({
  from: setTitle,
  to: tablesModel.setTitleFx,
});
