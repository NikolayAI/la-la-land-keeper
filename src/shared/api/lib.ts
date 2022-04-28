import { TableIdType } from 'shared/types';
import { TableProductTimerStatuses } from './constants';
import { IProduct, ITable, ITableProduct } from './types';

export const createTableBody = ({ id }: { id: TableIdType }): ITable => ({
  id,
  title: 'неизвестный стол',
  products: {},
});

export const createTableProductBody = (product: IProduct): ITableProduct => ({
  ...product,
  units: 1,
  createdAt: new Date(),
  timerStatus: TableProductTimerStatuses.PLAY,
});
