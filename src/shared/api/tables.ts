import { v4 } from 'uuid';

import { headers } from './constants';
import { createTableBody, createTableProductBody } from './lib';
import { getProducts } from './products';
import {
  IAddProductToTableParams,
  IClearTableParams,
  IDecreaseTableProductParams,
  IRemoveProductToTableParams,
  IRemoveTableParams,
  IIncreaseTableProductParams,
  ISetTableProductTimerStatusParams,
  ISetTableTitleParams,
  TablesType,
} from './types';

export const getTables = async (): Promise<TablesType> => {
  const response = await fetch('http://localhost:3001/tables');
  return await response.json();
};

export const setTables = async (tables: TablesType): Promise<void> => {
  await fetch('http://localhost:3001/tables', {
    method: 'POST',
    body: JSON.stringify(tables),
    headers,
  });
};

export const createTable = async (): Promise<void> => {
  const tables = await getTables();
  const id = v4();
  tables[id] = createTableBody({ id });
  await setTables(tables);
};

export const removeTable = async ({
  id,
}: IRemoveTableParams): Promise<void> => {
  const tables = await getTables();
  delete tables[id];
  await setTables(tables);
};

export const setTableTitle = async ({
  id,
  text,
}: ISetTableTitleParams): Promise<void> => {
  const tables = await getTables();
  tables[id].title = text;
  await setTables(tables);
};

export const clearTable = async ({
  tableId,
}: IClearTableParams): Promise<void> => {
  const tables = await getTables();
  tables[tableId].products = {};
  await setTables(tables);
};

export const addProductToTable = async ({
  productId,
  tableId,
}: IAddProductToTableParams): Promise<void> => {
  const tables = await getTables();
  const products = await getProducts();
  tables[tableId].products[productId] = createTableProductBody(
    products[productId]
  );
  await setTables(tables);
};

export const removeProductFromTable = async ({
  productId,
  tableId,
}: IRemoveProductToTableParams): Promise<void> => {
  const tables = await getTables();
  delete tables[tableId].products[productId];
  await setTables(tables);
};

export const increaseTableProduct = async ({
  productId,
  tableId,
  value,
}: IIncreaseTableProductParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].units = value;
  await setTables(tables);
};

export const decreaseTableProduct = async ({
  productId,
  tableId,
  value,
}: IDecreaseTableProductParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].units = value;
  await setTables(tables);
};

export const setTableProductTimerStatus = async ({
  productId,
  tableId,
  value,
}: ISetTableProductTimerStatusParams) => {
  const tables = await getTables();
  tables[tableId].products[productId].timerStatus = value;
  await setTables(tables);
};
