import { allSettled, fork } from 'effector';

import { tablesModel } from '../tables';
import { TablesAPI, TableProductTimerStatuses } from '@shared/api/';

const mockCreateTable = jest.spyOn(TablesAPI, 'createTable');
const mockDeleteTable = jest.spyOn(TablesAPI, 'deleteTable');
const mockSetTableTitle = jest.spyOn(TablesAPI, 'setTableTitle');
const mockAddProductToTable = jest.spyOn(TablesAPI, 'addProductToTable');
const mockDeleteProductFromTable = jest.spyOn(
  TablesAPI,
  'deleteProductFromTable'
);
const mockClearTable = jest.spyOn(TablesAPI, 'clearTable');
const mockIncreaseTableProduct = jest.spyOn(TablesAPI, 'increaseTableProduct');
const mockDecreaseTableProduct = jest.spyOn(TablesAPI, 'decreaseTableProduct');
const mockSetTableProductTimerStatus = jest.spyOn(
  TablesAPI,
  'setTableProductTimerStatus'
);

test('createTableFx should calls TablesAPI.createTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.createTableFx, { scope });

  expect(mockCreateTable).toHaveBeenCalledTimes(1);
});

test('deleteTableFx should calls TablesAPI.deleteTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.deleteTableFx, { scope, params: { id: '1' } });

  expect(mockDeleteTable).toHaveBeenCalledTimes(1);
});

test('setTitleFx should calls TablesAPI.setTableTitle', async () => {
  const scope = fork();

  await allSettled(tablesModel.setTitleFx, {
    scope,
    params: { id: '1', text: 'test' },
  });

  expect(mockSetTableTitle).toHaveBeenCalledTimes(1);
});

test('addProductFx should calls TablesAPI.addProductToTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.addProductFx, {
    scope,
    params: { tableId: '1', productId: '2' },
  });

  expect(mockAddProductToTable).toHaveBeenCalledTimes(1);
});

test('deleteProductFx should calls TablesAPI.deleteProductFromTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.deleteProductFx, {
    scope,
    params: { tableId: '1', productId: '2' },
  });

  expect(mockDeleteProductFromTable).toHaveBeenCalledTimes(1);
});

test('clearTableFx should calls TablesAPI.clearTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.clearTableFx, {
    scope,
    params: { tableId: '1' },
  });

  expect(mockClearTable).toHaveBeenCalledTimes(1);
});

test('increaseTableProductFx should calls TablesAPI.increaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.increaseTableProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(mockIncreaseTableProduct).toHaveBeenCalledTimes(1);
});

test('decreaseTableProductFx should calls TablesAPI.decreaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.decreaseTableProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(mockDecreaseTableProduct).toHaveBeenCalledTimes(1);
});

test('setTableProductTimerStatusFx should calls TablesAPI.setTableProductTimerStatus', async () => {
  const scope = fork();

  await allSettled(tablesModel.setTableProductTimerStatusFx, {
    scope,
    params: {
      tableId: '1',
      productId: '2',
      value: TableProductTimerStatuses.STOP,
    },
  });

  expect(mockSetTableProductTimerStatus).toHaveBeenCalledTimes(1);
});

test(`$tablesProductsTimersOutOfLimits should not calculate boolean values`, async () => {
  const scope = fork({
    values: [
      [
        tablesModel.$tables,
        {
          1: {
            id: '1',
            title: 'test',
            products: {
              2: {
                units: 1,
              },
            },
          },
        },
      ],
    ],
  });

  expect(
    scope.getState(tablesModel.$tablesProductsTimersOutOfLimits)
  ).toStrictEqual({ 1: {} });
});

test(`$tablesProductsTimersOutOfLimits should calculate boolean values`, async () => {
  const scope = fork({
    values: [
      [
        tablesModel.$tables,
        {
          1: {
            id: '1',
            title: 'test',
            products: {
              2: {
                units: 1,
                needTimer: true,
                createdAt: new Date(),
                timerStatus: TableProductTimerStatuses.STOP,
                eachProductUnitMinutesTimer: 20,
              },
            },
          },
        },
      ],
    ],
  });

  expect(
    scope.getState(tablesModel.$tablesProductsTimersOutOfLimits)
  ).toStrictEqual({
    1: { 2: false },
  });
});
