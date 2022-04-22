import { createEvent, forward } from 'effector';

import { tablesModel } from 'entities/tables';
import { IPlayTableProductTimerParams } from './types';

export const play = createEvent<IPlayTableProductTimerParams>();

forward({
  from: play,
  to: tablesModel.setTableProductTimerStatusFx,
});
