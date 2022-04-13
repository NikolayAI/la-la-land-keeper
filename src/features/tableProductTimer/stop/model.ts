import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { IStopProductTableTimerParams } from './types';

export const stopTableProductTimer =
  createEvent<IStopProductTableTimerParams>();

forward({
  from: stopTableProductTimer,
  to: tablesModel.setTableProductTimerStatusFx,
});
