import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { IPlayTableProductTimerParams } from './types';

export const playTableProductTimer =
  createEvent<IPlayTableProductTimerParams>();

forward({
  from: playTableProductTimer,
  to: tablesModel.setTableProductTimerStatusFx,
});
