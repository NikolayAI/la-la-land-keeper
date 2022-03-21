import { IProduct, ITable, ITableProduct } from './types';
import { TableProductTimerStatuses } from './constants';

export const createTableBody = ({ id }: { id: string }): ITable => {
  return {
    id,
    title: 'неизвестный стол',
    products: {},
  };
};

export const createTableProductBody = (product: IProduct): ITableProduct => {
  return {
    ...product,
    units: 1,
    createdAt: new Date(),
    timerStatus: TableProductTimerStatuses.PLAY,
  };
};
