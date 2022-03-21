import { createEvent, forward } from 'effector';

import {
  INotification,
  notificationsModel
} from '../../../entities/notifications';

export const closeNotification = createEvent<INotification>();

forward({
  from: closeNotification,
  to: notificationsModel.deleteNotification,
});