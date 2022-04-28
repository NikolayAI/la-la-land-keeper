import {
  NotificationMessageType,
  ProductIdType,
  TableIdType,
} from 'shared/types';
import { NotificationKinds } from './constants';

export interface INotification {
  kind: NotificationKinds;
  message: NotificationMessageType;
  tableId: TableIdType;
  productId: ProductIdType;
}
