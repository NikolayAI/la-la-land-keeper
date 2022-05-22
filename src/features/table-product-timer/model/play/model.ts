import { combine, createEvent, createStore, forward } from 'effector';

import { tablesModel } from '@/entities/tables';
import { IPlayTableProductTimerParams } from './types';

export const play = createEvent<IPlayTableProductTimerParams>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.setTableProductTimerStatusFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: play,
  to: tablesModel.setTableProductTimerStatusFx,
});
