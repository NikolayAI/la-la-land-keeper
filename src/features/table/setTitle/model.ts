import { createEvent, forward } from 'effector';

import { ISetTableTitleParams } from 'shared/api';
import { tablesModel } from 'entities/tables';

export const setTableTitle = createEvent<ISetTableTitleParams>();

forward({
  from: setTableTitle,
  to: tablesModel.setTitleFx,
});
