import { createEvent, forward } from 'effector';

import { IStopProductTableTimerParams } from './types';
import { tablesModel } from 'entities/tables';

export const stopTableProductTimer =
  createEvent<IStopProductTableTimerParams>();

forward({
  from: stopTableProductTimer,
  to: tablesModel.setTableProductTimerStatusFx,
});
