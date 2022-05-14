import { createEvent, createStore, sample } from 'effector';

import { TableProductTimerStatuses } from '@/shared';
import { productsModel } from '../../../products';
import { tablesModel } from '../../../tables';
import { NotificationKinds } from '../constants';
import { INotification } from '../types';

export const addNotification = createEvent<INotification>();
export const removeNotification = createEvent<INotification>();

export const $tableProductsTimersNotifications = createStore<INotification[]>([]);

$tableProductsTimersNotifications
  .on(addNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, { tableId, productId, kind, message }) => {
    const index = state.findIndex(
      (i) => i.tableId === tableId && i.productId === productId && i.kind === kind && i.message === message
    );
    state.splice(index, 1);
    return [...state];
  });

sample({
  source: {
    timers: tablesModel.$tablesProductsTimersOutOfLimits,
    tables: tablesModel.$tables,
    products: productsModel.$products,
  },
  fn: ({ timers, tables, products }) => {
    const result = [];
    for (const tableId in timers) {
      for (const productId in timers[tableId]) {
        const isTimerPlay = tables[tableId].products[productId].timerStatus === TableProductTimerStatuses.play;
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
