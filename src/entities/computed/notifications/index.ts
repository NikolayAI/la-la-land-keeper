import { removeNotification, $tableProductsTimersNotifications, addNotification } from './model';
import { Notifications } from './ui/notification';

export * from './types';

export const notificationsModel = {
  addNotification,
  removeNotification,
  $tableProductsTimersNotifications,
};

export const NotificationsUI = {
  Notifications,
};
