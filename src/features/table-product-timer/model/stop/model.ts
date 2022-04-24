import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { IStopProductTableTimerParams } from './types';

export const stop = createEvent<IStopProductTableTimerParams>();

forward({
  from: stop,
  to: tablesModel.setTableProductTimerStatusFx,
});
