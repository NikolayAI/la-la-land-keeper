import { TableProductTimerStatuses } from '@/shared';

export const product = {
  id: 'test-product-id',
  name: 'test product',
  price: 1,
  isPiece: true,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

export const products = {
  [product.id]: product,
};

export const tableProduct = {
  id: 'test-table-product-id',
  name: 'test table product',
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
  [tableProduct.id]: tableProduct,
};

export const table = {
  id: 'test-table-id',
  name: 'test table',
  products: tableProducts,
};

export const tables = {
  [table.id]: table,
};

export const tablesProductsTimers = {
  [table.id]: {
    [tableProduct.id]: 0,
  },
};
