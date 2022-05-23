import { allSettled, fork } from 'effector';

import { TableProductTimerStatuses, TablesAPI } from '@/shared';
import { tablesModel } from '@/entities/tables';

jest.mock('@/shared');

test('createTableFx should calls TablesAPI.createTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.createTableFx, { scope });

  expect(TablesAPI.createTable).toHaveBeenCalledTimes(1);
});

test('removeTableFx should calls TablesAPI.removeTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.removeTableFx, { scope, params: { id: '1' } });

  expect(TablesAPI.removeTable).toHaveBeenCalledTimes(1);
});

test('setNameFx should calls TablesAPI.setTableName', async () => {
  const scope = fork();

  await allSettled(tablesModel.setNameFx, {
    scope,
    params: { id: '1', text: 'test' },
  });

  expect(TablesAPI.setTableName).toHaveBeenCalledTimes(1);
});

test('addProductFx should calls TablesAPI.addProductToTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.addProductFx, {
    scope,
    params: { tableId: '1', productId: '2' },
  });

  expect(TablesAPI.addProductToTable).toHaveBeenCalledTimes(1);
});

test('removeProductFx should calls TablesAPI.removeProductFromTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.removeProductFx, {
    scope,
    params: { tableId: '1', productId: '2' },
  });

  expect(TablesAPI.removeProductFromTable).toHaveBeenCalledTimes(1);
});

test('clearTableFx should calls TablesAPI.clearTable', async () => {
  const scope = fork();

  await allSettled(tablesModel.clearTableFx, {
    scope,
    params: { tableId: '1' },
  });

  expect(TablesAPI.clearTable).toHaveBeenCalledTimes(1);
});

test('increaseProductFx should calls TablesAPI.increaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.increaseProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(TablesAPI.increaseTableProduct).toHaveBeenCalledTimes(1);
});

test('decreaseProductFx should calls TablesAPI.decreaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.decreaseProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(TablesAPI.decreaseTableProduct).toHaveBeenCalledTimes(1);
});

test('setProductTimerStatusFx should calls TablesAPI.setTableProductTimerStatus', async () => {
  const scope = fork();

  await allSettled(tablesModel.setProductTimerStatusFx, {
    scope,
    params: {
      tableId: '1',
      productId: '2',
      timerStatus: TableProductTimerStatuses.stop,
      pausedAt: null,
      pausedTimerCount: 0,
    },
  });

  expect(TablesAPI.setTableProductTimerStatus).toHaveBeenCalledTimes(1);
});

test(`$tablesProductsTimersOutOfLimits should not calculate boolean values`, async () => {
  const scope = fork({
    values: [
      [
        tablesModel.$tables,
        {
          1: {
            id: '1',
            name: 'test',
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

  expect(scope.getState(tablesModel.$tablesProductsTimersOutOfLimits)).toStrictEqual({ 1: {} });
});

test(`$tablesProductsTimersOutOfLimits should calculate boolean values`, async () => {
  const scope = fork({
    values: [
      [
        tablesModel.$tables,
        {
          1: {
            id: '1',
            name: 'test',
            products: {
              2: {
                units: 1,
                needTimer: true,
                createdAt: new Date(),
                timerStatus: TableProductTimerStatuses.stop,
                eachProductUnitMinutesTimer: 20,
              },
            },
          },
        },
      ],
    ],
  });

  expect(scope.getState(tablesModel.$tablesProductsTimersOutOfLimits)).toStrictEqual({
    1: { 2: false },
  });
});
