import {
  removeProductFx,
  addProductFx,
  $tables,
  getTablesFx,
  setTablesProductsTimers,
  $tablesProductsTimers,
  $tablesProductsTimersOutOfLimits,
  setTableProductTimerStatusFx,
  decreaseTableProductFx,
  increaseTableProductFx,
  createTableFx,
  clearTableFx,
  removeTableFx,
  $tablesIds,
  setNameFx,
} from './model';
import { Table } from './ui';

export { calculateTableTotalPrice } from './lib';
export * from './types';

export const tablesModel = {
  removeProductFx,
  addProductFx,
  $tables,
  getTablesFx,
  setTablesProductsTimers,
  $tablesProductsTimers,
  $tablesProductsTimersOutOfLimits,
  setTableProductTimerStatusFx,
  decreaseTableProductFx,
  increaseTableProductFx,
  createTableFx,
  clearTableFx,
  removeTableFx,
  $tablesIds,
  setNameFx,
};

export const TablesUI = {
  Table,
};
