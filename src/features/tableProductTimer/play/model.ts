import { createEvent, forward } from 'effector';

import { IPlayTableProductTimerParams } from './types';
import { tablesModel } from '@entities/tables';

export const playTableProductTimer =
  createEvent<IPlayTableProductTimerParams>();

forward({
  from: playTableProductTimer,
  to: tablesModel.setTableProductTimerStatusFx,
});
