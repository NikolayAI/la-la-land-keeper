import { createEvent, forward } from 'effector';

import {
  INotification,
  notificationsModel,
} from '@entities/computed/notifications';

export const closeNotification = createEvent<INotification>();

forward({
  from: closeNotification,
  to: notificationsModel.deleteNotification,
});
