import { combine, createEffect, createEvent, createStore, forward } from 'effector';

import {
  IAddProductToTableParams,
  IClearTableParams,
  IDecreaseTableProductParams,
  IIncreaseTableProductParams,
  IRemoveProductToTableParams,
  IRemoveTableParams,
  ISetTableProductTimerStatusParams,
  ISetTablesProductsTimersParams,
  ISetTableNameParams,
  TablesAPI,
  TablesType,
} from '@/shared';
import { TableProductsTimersType } from '../types';

export const setTablesProductsTimers = createEvent<ISetTablesProductsTimersParams>();

export const getTablesFx = createEffect<void, TablesType, Error>();
export const createTableFx = createEffect<void, void, Error>();
export const removeTableFx = createEffect<IRemoveTableParams, void, Error>();
export const setNameFx = createEffect<ISetTableNameParams, void, Error>();
export const addProductFx = createEffect<IAddProductToTableParams, void, Error>();
export const removeProductFx = createEffect<IRemoveProductToTableParams, void, Error>();
export const clearTableFx = createEffect<IClearTableParams, void, Error>();
export const increaseTableProductFx = createEffect<IIncreaseTableProductParams, void, Error>();
export const decreaseTableProductFx = createEffect<IDecreaseTableProductParams, void, Error>();
export const setTableProductTimerStatusFx = createEffect<ISetTableProductTimerStatusParams, void, Error>();

export const $tables = createStore<TablesType>({});
export const $tablesProductsTimers = createStore<TableProductsTimersType>({});

getTablesFx.use(async () => {
  return await TablesAPI.getTables();
});
createTableFx.use(async () => {
  await TablesAPI.createTable();
});
removeTableFx.use(async ({ id }) => {
  await TablesAPI.removeTable({ id });
});
setNameFx.use(async ({ id, text }) => {
  await TablesAPI.setTableName({ id, text });
});
addProductFx.use(async ({ productId, tableId }) => {
  await TablesAPI.addProductToTable({ productId, tableId });
});
removeProductFx.use(async ({ productId, tableId }) => {
  await TablesAPI.removeProductFromTable({ productId, tableId });
});
clearTableFx.use(async ({ tableId }) => {
  await TablesAPI.clearTable({ tableId });
});
increaseTableProductFx.use(async ({ productId, tableId, value }) => {
  await TablesAPI.increaseTableProduct({ productId, tableId, value });
});
decreaseTableProductFx.use(async ({ productId, tableId, value }) => {
  await TablesAPI.decreaseTableProduct({ productId, tableId, value });
});
setTableProductTimerStatusFx.use(async (payload) => {
  await TablesAPI.setTableProductTimerStatus(payload);
});

export const $tablesIds = combine($tables, (tables) => Object.keys(tables));
export const $tablesProductsTimersOutOfLimits = combine(
  $tables,
  $tablesProductsTimers,
  (tables, tablesProductsTimers) => {
    const result: Record<string, Record<string, boolean>> = {};
    for (const tableId in tables) {
      result[tableId] = {};
      for (const productId in tables[tableId].products) {
        const product = tables[tableId].products[productId];
        if (product.needTimer) {
          const timerDelta = tablesProductsTimers[tableId]?.[productId];
          const range = product.eachProductUnitMinutesTimer * product.units;
          result[tableId][productId] = timerDelta >= range;
        }
      }
    }
    return result;
  }
);

$tables.on(getTablesFx.doneData, (_, tables) => tables);
$tablesProductsTimers.on(setTablesProductsTimers, (state, { tableId, productId, value }) => ({
  ...state,
  [tableId]: {
    ...state[tableId],
    [productId]: value,
  },
}));

forward({
  from: [
    createTableFx.doneData,
    removeTableFx.doneData,
    setNameFx.doneData,
    addProductFx.doneData,
    removeProductFx.doneData,
    clearTableFx.doneData,
    increaseTableProductFx.doneData,
    decreaseTableProductFx.doneData,
    setTableProductTimerStatusFx.doneData,
  ],
  to: getTablesFx,
});
