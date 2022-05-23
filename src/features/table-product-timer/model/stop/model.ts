import { combine, createEvent, createStore, forward } from 'effector';

import { tablesModel } from '@/entities/tables';
import { IStopProductTableTimerParams } from './types';

export const stop = createEvent<IStopProductTableTimerParams>();

export const $isLoading = createStore<boolean>(false);

$isLoading.on(
  combine(tablesModel.setProductTimerStatusFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);

forward({
  from: stop,
  to: tablesModel.setProductTimerStatusFx,
});
