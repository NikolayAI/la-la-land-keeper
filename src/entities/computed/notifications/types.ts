import { NotificationKinds } from './constants';

export interface INotification {
  kind: NotificationKinds;
  message: string;
  tableId: string;
  productId: string;
}