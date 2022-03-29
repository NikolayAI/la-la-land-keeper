import { TableProductTimerStatuses } from 'shared/api';

export const product = {
  id: 'test-product-id',
  title: 'test product',
  price: 1,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

export const products = {
  'test-product-id': product,
};

export const tableProduct = {
  id: 'test-table-product-id',
  title: 'test table product',
  price: 1,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
  units: 1,
  createdAt: new Date(),
  timerStatus: TableProductTimerStatuses.PLAY,
};

export const tableProducts = {
  'test-table-product-id': tableProduct,
};

export const table = {
  id: 'test-table-id',
  title: 'test table',
  products: tableProducts,
};

export const tables = {
  'test-table-id': table,
};
