import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { ISetTableTitleParams } from 'shared/api';

export const setTableTitle = createEvent<ISetTableTitleParams>();

forward({
  from: setTableTitle,
  to: tablesModel.setTitleFx,
});