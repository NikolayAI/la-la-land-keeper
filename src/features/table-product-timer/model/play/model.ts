import { createEvent, createStore, sample } from 'effector';

import { TablesProductsLoadingType } from '@/shared';
import { tablesModel } from '@/entities/tables';

import { IPlayTableProductTimerParams } from './types';

export const play = createEvent<IPlayTableProductTimerParams>();

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
  clock: play,
  target: tablesModel.setProductTimerStatusFx,
});
