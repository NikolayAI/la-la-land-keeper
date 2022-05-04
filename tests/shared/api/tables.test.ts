import { TableProductTimerStatuses } from '@/shared/api/constants';
import {
  addProductToTable,
  clearTable,
  createTable,
  decreaseTableProduct,
  removeProductFromTable,
  removeTable,
  getTables,
  increaseTableProduct,
  setTableProductTimerStatus,
  setTables,
  setTableTitle,
} from '@/shared/api/tables';
import { tables } from '../../__mocks__/fixtures';

const tableId = 'test-table-id';
const productId = 'test-table-product-id';
const value = 1;

test('getTables should return value', async () => {
  const result = await getTables();

  expect(result).toStrictEqual(tables);
});

test('should call setTables', async () => {
  const result = await setTables(tables);

  expect(result).toStrictEqual(undefined);
});

test('should call createTable', async () => {
  const result = await createTable();

  expect(result).toStrictEqual(undefined);
});

test('should call removeTable', async () => {
  const result = await removeTable({ id: tableId });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableTitle', async () => {
  const result = await setTableTitle({
    id: tableId,
    text: 'test table',
  });

  expect(result).toStrictEqual(undefined);
});

test('should call clearTable', async () => {
  const result = await clearTable({ tableId });

  expect(result).toStrictEqual(undefined);
});

test('should call addProductToTable', async () => {
  const result = await addProductToTable({ tableId, productId });

  expect(result).toStrictEqual(undefined);
});

test('should call removeProductFromTable', async () => {
  const result = await removeProductFromTable({ tableId, productId });

  expect(result).toStrictEqual(undefined);
});

test('should call increaseTableProduct', async () => {
  const result = await increaseTableProduct({ tableId, productId, value });

  expect(result).toStrictEqual(undefined);
});

test('should call decreaseTableProduct', async () => {
  const result = await decreaseTableProduct({ tableId, productId, value });

  expect(result).toStrictEqual(undefined);
});

test('should call setTableProductTimerStatus', async () => {
  const result = await setTableProductTimerStatus({
    tableId,
    productId,
    value: TableProductTimerStatuses.STOP,
  });

  expect(result).toStrictEqual(undefined);
});
