import {
  $isLoading,
  $tables,
  $tablesIds,
  $tablesProductsTimers,
  $tablesProductsTimersOutOfLimits,
  addProductFx,
  clearTableFx,
  createTableFx,
  decreaseProductFx,
  getTablesFx,
  increaseProductFx,
  removeProductFx,
  removeTableFx,
  setNameFx,
  setProductTimerStatusFx,
  setTablesProductsTimers,
} from './model';
import { ProductCard } from './ui/product-card';
import { ProductTimer } from './ui/product-timer';
import { Table } from './ui/table';

export { calculateTableTotalPrice } from './lib';
export { backgroundColors } from './constants';

export const tablesModel = {
  removeProductFx,
  addProductFx,
  $tables,
  getTablesFx,
  setTablesProductsTimers,
  $tablesProductsTimers,
  $tablesProductsTimersOutOfLimits,
  setProductTimerStatusFx,
  decreaseProductFx,
  increaseProductFx,
  createTableFx,
  clearTableFx,
  removeTableFx,
  $tablesIds,
  setNameFx,
  $isLoading,
};

export const TablesUI = {
  Table,
  ProductCard,
  ProductTimer,
};
