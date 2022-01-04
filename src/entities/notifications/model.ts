import { createEvent, createStore } from 'effector';import { INotification } from './types';export const addNotification = createEvent<INotification>();export const deleteNotification = createEvent<INotification>();export const $tableProductsTimersNotifications = createStore<INotification[]>([]);$tableProductsTimersNotifications.watch(data => console.log('notifications: ', data))$tableProductsTimersNotifications  .on(addNotification, (state, notification) => {    return [...state, notification];  })  .on(deleteNotification, (state, { tableId, productId }) => {    return state.filter(      (item) => item.tableId !== tableId && item.productId !== productId    );  });