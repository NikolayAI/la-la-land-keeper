import { combine, createEffect, createEvent, createStore, sample } from 'effector';

import {
  IAddProductToTableParams,
  IClearTableParams,
  IDecreaseTableProductParams,
  IIncreaseTableProductParams,
  IRemoveProductToTableParams,
  IRemoveTableParams,
  ISetTableNameParams,
  ISetTableProductTimerStatusParams,
  ISetTablesProductsTimersParams,
  TableIdType,
  TableProductsTimersType,
  TablesAPI,
  TablesType,
} from '@/shared';

import { sortTablesByOrder } from '../lib';

export const setTablesProductsTimers = createEvent<ISetTablesProductsTimersParams>();

export const getTablesFx = createEffect<void, TablesType, Error>();
export const createTableFx = createEffect<void, void, Error>();
export const removeTableFx = createEffect<IRemoveTableParams, void, Error>();
export const setNameFx = createEffect<ISetTableNameParams, void, Error>();
export const addProductFx = createEffect<IAddProductToTableParams, void, Error>();
export const removeProductFx = createEffect<IRemoveProductToTableParams, void, Error>();
export const clearTableFx = createEffect<IClearTableParams, void, Error>();
export const increaseProductFx = createEffect<IIncreaseTableProductParams, void, Error>();
export const decreaseProductFx = createEffect<IDecreaseTableProductParams, void, Error>();
export const setProductTimerStatusFx = createEffect<ISetTableProductTimerStatusParams, void, Error>();

export const $isLoading = createStore<boolean>(false);
export const $tables = createStore<TablesType>({});
export const $tablesIds = createStore<TableIdType[]>([]);
export const $tablesProductsTimers = createStore<TableProductsTimersType>({});

getTablesFx.use(async () => {
  return await TablesAPI.getTables();
});
createTableFx.use(async () => {
  await TablesAPI.createTable();
});
removeTableFx.use(async ({ tableId }) => {
  await TablesAPI.removeTable({ tableId });
});
setNameFx.use(async ({ tableId, text }) => {
  await TablesAPI.setTableName({ tableId, text });
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
increaseProductFx.use(async ({ productId, tableId, value }) => {
  await TablesAPI.increaseTableProduct({ productId, tableId, value });
});
decreaseProductFx.use(async ({ productId, tableId, value }) => {
  await TablesAPI.decreaseTableProduct({ productId, tableId, value });
});
setProductTimerStatusFx.use(async (payload) => {
  await TablesAPI.setTableProductTimerStatus(payload);
});

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

$isLoading.on(
  combine(
    getTablesFx.pending,
    createTableFx.pending,
    removeTableFx.pending,
    setNameFx.pending,
    addProductFx.pending,
    removeProductFx.pending,
    clearTableFx.pending,
    increaseProductFx.pending,
    decreaseProductFx.pending,
    setProductTimerStatusFx.pending,
    (...args) => args.some((isLoading) => isLoading)
  ),
  (isLoading) => isLoading
);
$tables.on(getTablesFx.doneData, (_, tables) => tables);
$tablesIds.on($tables, (_, tables) => sortTablesByOrder(tables));
$tablesProductsTimers.on(setTablesProductsTimers, (state, { tableId, productId, value }) => ({
  ...state,
  [tableId]: {
    ...state[tableId],
    [productId]: value,
  },
}));

sample({
  clock: [
    createTableFx.doneData,
    removeTableFx.doneData,
    setNameFx.doneData,
    addProductFx.doneData,
    removeProductFx.doneData,
    clearTableFx.doneData,
    increaseProductFx.doneData,
    decreaseProductFx.doneData,
    setProductTimerStatusFx.doneData,
  ],
  target: getTablesFx,
});
