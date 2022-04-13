import { createEvent, createStore, sample } from 'effector';

import { TableProductTimerStatuses } from 'shared/api';
import { productsModel } from '../../products';
import { tablesModel } from '../../tables';
import { NotificationKinds } from './constants';
import { INotification } from './types';

export const addNotification = createEvent<INotification>();
export const deleteNotification =
  createEvent<Pick<INotification, 'tableId' | 'productId'>>();

export const $tableProductsTimersNotifications = createStore<INotification[]>(
  []
);

$tableProductsTimersNotifications
  .on(addNotification, (state, notification) => {
    return [...state, notification];
  })
  .on(deleteNotification, (state, { tableId, productId }) => {
    const index = state.findIndex((i) => {
      return i.tableId === tableId && i.productId === productId;
    });
    state.splice(index, 1);
    return [...state];
  });

sample({
  source: [
    tablesModel.$tablesProductsTimersOutOfLimits,
    tablesModel.$tables,
    productsModel.$products,
  ],
  fn: ([timers, tables, products]) => {
    const result = [];
    for (const tableId in timers) {
      for (const productId in timers[tableId]) {
        const isTimerPlay =
          tables[tableId].products[productId].timerStatus ===
          TableProductTimerStatuses.PLAY;
        if (timers[tableId]?.[productId] && isTimerPlay) {
          result.push({
            tableId,
            productId,
            kind: NotificationKinds.ERROR,
            message: `Время для ${products[productId]?.title} на столе ${tables[tableId]?.title} истекло`,
          });
        }
      }
    }
    return result;
  },
  target: $tableProductsTimersNotifications,
});
