import { createEvent, sample } from 'effector';import { INotification, notificationsModel } from '../../entities/notifications';import { tablesModel } from '../../entities/tables';export const sendNotification = createEvent();export const closeNotification = createEvent<INotification>();//// sample({//   clock: tablesModel.$isTablesProductsTimersOutOfLimits,//   fn: (timers) => {//     return Object.keys(timers).map((tableId) => {//       return {//         kind//       }//     })//   },//   target: notificationsModel.$tableProductsTimersNotifications// })