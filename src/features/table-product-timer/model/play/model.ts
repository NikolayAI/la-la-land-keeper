import { createEvent, createStore, forward } from 'effector';

import { TableIdType, TableProductIdType } from '@/shared';
import { tablesModel } from '@/entities/tables';
import { IPlayTableProductTimerParams } from './types';

export const play = createEvent<IPlayTableProductTimerParams>();

export const $isLoading = createStore<Record<TableIdType, Record<TableProductIdType, boolean>>>({});

$isLoading
  .on(tablesModel.setProductTimerStatusFx.finally, (state, { params: { tableId, productId } }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: false,
    },
  }))
  .on(play, (state, { tableId, productId }) => ({
    ...state,
    [tableId]: {
      ...state[tableId],
      [productId]: true,
    },
  }));

forward({
  from: play,
  to: tablesModel.setProductTimerStatusFx,
});
