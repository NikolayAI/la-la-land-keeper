import {
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
} from './model';
import { Table } from './ui';

export { calculateTableTotalPrice } from './lib';

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
};
