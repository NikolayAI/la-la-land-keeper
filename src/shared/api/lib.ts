import { TableProductTimerStatuses } from '../constants';
import { TableIdType, IProduct, ITable, ITableProduct } from '../types';

export const createTableBody = ({ id }: { id: TableIdType }): ITable => ({
  id,
  name: 'неизвестный стол',
  products: {},
});

export const createTableProductBody = (product: IProduct): ITableProduct => ({
  ...product,
  units: 1,
  createdAt: new Date(),
  timerStatus: TableProductTimerStatuses.play,
  pausedAt: null,
  pausedTimerCount: 0,
});
