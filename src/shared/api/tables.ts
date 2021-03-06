import { v4 } from 'uuid';

import { HttpClient } from '../lib';
import {
  IAddProductToTableParams,
  IClearTableParams,
  IDecreaseTableProductParams,
  IIncreaseTableProductParams,
  IRemoveProductToTableParams,
  IRemoveTableParams,
  ISetTableProductTimerStatusParams,
  ISetTableNameParams,
  TablesType,
} from '../types';
import { headers } from './constants';
import { createTableBody, createTableProductBody } from './lib';
import { getProducts } from './products';

export const getTables = async (): Promise<TablesType> => {
  const { data } = await HttpClient.get<TablesType>({ url: '/tables' });
  return data;
};

export const setTables = async (tables: TablesType): Promise<void> => {
  await HttpClient.post({
    url: '/tables',
    data: tables,
    config: { headers },
  });
};

export const createTable = async (): Promise<void> => {
  const tables = await getTables();
  const id = v4();
  tables[id] = createTableBody({ id });
  await setTables(tables);
};

export const removeTable = async ({ tableId }: IRemoveTableParams): Promise<void> => {
  const tables = await getTables();
  delete tables[tableId];
  await setTables(tables);
};

export const setTableName = async ({ tableId, text }: ISetTableNameParams): Promise<void> => {
  const tables = await getTables();
  tables[tableId].name = text;
  await setTables(tables);
};

export const clearTable = async ({ tableId }: IClearTableParams): Promise<void> => {
  const tables = await getTables();
  tables[tableId].products = {};
  await setTables(tables);
};

export const addProductToTable = async ({ productId, tableId }: IAddProductToTableParams): Promise<void> => {
  const tables = await getTables();
  const products = await getProducts();
  tables[tableId].products[productId] = createTableProductBody(products[productId]);
  await setTables(tables);
};

export const removeProductFromTable = async ({ productId, tableId }: IRemoveProductToTableParams): Promise<void> => {
  const tables = await getTables();
  delete tables[tableId].products[productId];
  await setTables(tables);
};

export const increaseTableProduct = async ({ productId, tableId, value }: IIncreaseTableProductParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].units = value;
  await setTables(tables);
};

export const decreaseTableProduct = async ({ productId, tableId, value }: IDecreaseTableProductParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].units = value;
  await setTables(tables);
};

export const setTableProductTimerStatus = async ({
  productId,
  tableId,
  timerStatus,
  pausedAt,
  pausedTimerCount,
}: ISetTableProductTimerStatusParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].timerStatus = timerStatus;
  tables[tableId].products[productId].pausedAt = pausedAt;
  tables[tableId].products[productId].pausedTimerCount = pausedTimerCount;
  await setTables(tables);
};
