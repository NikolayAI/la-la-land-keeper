import { createEvent, createStore } from 'effector';

import { INotification } from './types';

export const addNotification = createEvent<INotification>();
export const deleteNotification = createEvent<Pick<INotification, 'tableId' | 'productId'>>();

export const $tableProductsTimersNotifications = createStore<INotification[]>([]);

$tableProductsTimersNotifications
  .on(addNotification, (state, notification) => {
    return [...state, notification];
  })
  .on(deleteNotification, (state, { tableId, productId}) => {
    const index = state.findIndex((i) => {
      return i.tableId === tableId && i.productId === productId
    });
    state.splice(index, 1);
    return [...state];
  });