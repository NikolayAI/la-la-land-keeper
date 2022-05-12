import { allSettled, fork } from 'effector';

import { TablesAPI } from '@/shared';
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

test('setTitleFx should calls TablesAPI.setTableTitle', async () => {
  const scope = fork();

  await allSettled(tablesModel.setTitleFx, {
    scope,
    params: { id: '1', text: 'test' },
  });

  expect(TablesAPI.setTableTitle).toHaveBeenCalledTimes(1);
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

test('increaseTableProductFx should calls TablesAPI.increaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.increaseTableProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(TablesAPI.increaseTableProduct).toHaveBeenCalledTimes(1);
});

test('decreaseTableProductFx should calls TablesAPI.decreaseTableProduct', async () => {
  const scope = fork();

  await allSettled(tablesModel.decreaseTableProductFx, {
    scope,
    params: { tableId: '1', productId: '2', value: 1 },
  });

  expect(TablesAPI.decreaseTableProduct).toHaveBeenCalledTimes(1);
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

  expect(scope.getState(tablesModel.$tablesProductsTimersOutOfLimits)).toStrictEqual({
    1: { 2: false },
  });
});
