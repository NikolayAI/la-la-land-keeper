import { createEvent, createStore, sample } from 'effector';

import { TablesProductsLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

import { IStopProductTableTimerParams } from './types';

export const stop = createEvent<IStopProductTableTimerParams>();

export const $isLoading = createStore<TablesProductsLoadingType>({});

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

sample({
  clock: stop,
  target: tablesModel.setProductTimerStatusFx,
});
