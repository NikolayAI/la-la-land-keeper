import { TableProductTimerStatuses, TablesAPI } from '@/shared';
import { tables } from '../../__mocks__/fixtures';

const tableId = 'test-table-id';
const productId = 'test-table-product-id';
const value = 1;

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
  const result = await TablesAPI.removeTable({ id: tableId });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableTitle', async () => {
  const result = await TablesAPI.setTableTitle({
    id: tableId,
    text: 'test table',
  });

  expect(result).toStrictEqual(undefined);
});

test('should call clearTable', async () => {
  const result = await TablesAPI.clearTable({ tableId });

  expect(result).toStrictEqual(undefined);
});

test('should call addProductToTable', async () => {
  const result = await TablesAPI.addProductToTable({ tableId, productId });

  expect(result).toStrictEqual(undefined);
});

test('should call removeProductFromTable', async () => {
  const result = await TablesAPI.removeProductFromTable({ tableId, productId });

  expect(result).toStrictEqual(undefined);
});

test('should call increaseTableProduct', async () => {
  const result = await TablesAPI.increaseTableProduct({
    tableId,
    productId,
    value,
  });

  expect(result).toStrictEqual(undefined);
});

test('should call decreaseTableProduct', async () => {
  const result = await TablesAPI.decreaseTableProduct({
    tableId,
    productId,
    value,
  });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableProductTimerStatus', async () => {
  const result = await TablesAPI.setTableProductTimerStatus({
    tableId,
    productId,
    value: TableProductTimerStatuses.stop,
  });

  expect(result).toStrictEqual(undefined);
});
