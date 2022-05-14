import { TableProductTimerStatuses } from '@/shared';

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
  createdAt: '2022-04-04T09:19:32.064Z',
  timerStatus: TableProductTimerStatuses.play,
  pausedAt: null,
  pausedTimerCount: 0,
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
