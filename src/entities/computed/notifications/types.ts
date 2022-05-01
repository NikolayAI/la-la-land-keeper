import { NotificationMessageType, ProductIdType, TableIdType } from '@/shared';
import { NotificationKinds } from './constants';

export interface INotification {
  kind: NotificationKinds;
  message: NotificationMessageType;
  tableId: TableIdType;
  productId: ProductIdType;
}
