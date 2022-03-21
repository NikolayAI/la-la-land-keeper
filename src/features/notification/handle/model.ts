import { sample } from 'effector';

import {
  NotificationKinds,
  notificationsModel
} from '../../../entities/notifications';
import { productsModel } from '../../../entities/products';
import { tablesModel } from '../../../entities/tables';
import { TableProductTimerStatuses } from '../../../shared/api';

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
        const isTimerPlay = tables[tableId].products[productId].timerStatus === TableProductTimerStatuses.PLAY;
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
  target: notificationsModel.$tableProductsTimersNotifications,
});
