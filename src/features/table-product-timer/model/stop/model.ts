import { createEvent, createStore, forward } from 'effector';

import { TablesProductLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

import { IStopProductTableTimerParams } from './types';

export const stop = createEvent<IStopProductTableTimerParams>();

export const $isLoading = createStore<TablesProductLoadingType>({});

$isLoading
  .on(tablesModel.setProductTimerStatusFx.finally, (state, { params: { tableId, productId } }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: false,
    },
  }))
  .on(tablesModel.setProductTimerStatusFx, (state, { tableId, productId }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: true,
    },
  }));

forward({
  from: stop,
  to: tablesModel.setProductTimerStatusFx,
});
