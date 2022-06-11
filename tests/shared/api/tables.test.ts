import { TableProductTimerStatuses, TablesAPI } from '@/shared';

import { tables, table, tableProduct } from '../../__mocks__/fixtures';

test('getTables should return value', async () => {
  const result = await TablesAPI.getTables();

  expect(result).toStrictEqual(tables);
});

test('should call setTables', async () => {
  const result = await TablesAPI.setTables(tables);

  expect(result).toStrictEqual(undefined);
});

test('should call createTable', async () => {
  const result = await TablesAPI.createTable();

  expect(result).toStrictEqual(undefined);
});

test('should call removeTable', async () => {
  const result = await TablesAPI.removeTable({ tableId: table.id });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableName', async () => {
  const result = await TablesAPI.setTableName({
    tableId: table.id,
    text: table.name,
  });

  expect(result).toStrictEqual(undefined);
});

test('should call clearTable', async () => {
  const result = await TablesAPI.clearTable({ tableId: table.id });

  expect(result).toStrictEqual(undefined);
});

test('should call addProductToTable', async () => {
  const result = await TablesAPI.addProductToTable({ tableId: table.id, productId: tableProduct.id });

  expect(result).toStrictEqual(undefined);
});

test('should call removeProductFromTable', async () => {
  const result = await TablesAPI.removeProductFromTable({ tableId: table.id, productId: tableProduct.id });

  expect(result).toStrictEqual(undefined);
});

test('should call increaseTableProduct', async () => {
  const result = await TablesAPI.increaseTableProduct({
    tableId: table.id,
    productId: tableProduct.id,
    value: 1,
  });

  expect(result).toStrictEqual(undefined);
});

test('should call decreaseTableProduct', async () => {
  const result = await TablesAPI.decreaseTableProduct({
    tableId: table.id,
    productId: tableProduct.id,
    value: 1,
  });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableProductTimerStatus', async () => {
  const result = await TablesAPI.setTableProductTimerStatus({
    tableId: table.id,
    productId: tableProduct.id,
    timerStatus: TableProductTimerStatuses.stop,
    pausedTimerCount: 0,
    pausedAt: null,
  });

  expect(result).toStrictEqual(undefined);
});
