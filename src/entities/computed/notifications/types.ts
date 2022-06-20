import { NotificationKinds, NotificationMessageType, ProductIdType, TableIdType } from '@/shared';

export interface INotification {
  kind: NotificationKinds;
  message: NotificationMessageType;
  tableId: TableIdType;
  productId: ProductIdType;
}
