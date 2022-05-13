import { allSettled, fork } from 'effector';

import { TableProductTimerStatuses } from '@/shared';
import { NotificationKinds, notificationsModel } from '@/entities/computed/notifications';
import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';

const params = {
  tableId: '1',
  productId: '2',
  kind: NotificationKinds.INFO,
  message: 'test',
};

test(`tableProductsTimersNotifications should take data when tablesProductsTimersOutOfLimits updated`, async () => {
  const scope = fork({
    values: [
      [
        productsModel.$products,
        {
          3: {
            id: '3',
            title: 'test product',
            price: 5,
            isPiece: true,
            needTimer: true,
            eachProductUnitMinutesTimer: 20,
          },
        },
      ],
      [
        tablesModel.$tablesProductsTimers,
        {
          1: {
            3: 30,
          },
        },
      ],
    ],
    handlers: [
      [
        tablesModel.getTablesFx,
        () => ({
          1: {
            id: '1',
            title: 'test table',
            products: {
              3: {
                units: 1,
                id: '3',
                title: 'test product',
                needTimer: true,
                createdAt: new Date(),
                timerStatus: TableProductTimerStatuses.PLAY,
                eachProductUnitMinutesTimer: 20,
              },
            },
          },
        }),
      ],
    ],
  });

  await allSettled(tablesModel.getTablesFx, { scope });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toHaveLength(1);
});

test(`tableProductsTimersNotifications should not take data when tablesProductsTimersOutOfLimits updated`, async () => {
  const scope = fork({
    values: [
      [
        productsModel.$products,
        {
          3: {
            id: '3',
            title: 'test product',
            price: 5,
            isPiece: true,
            needTimer: true,
            eachProductUnitMinutesTimer: 20,
          },
        },
      ],
    ],
    handlers: [
      [
        tablesModel.getTablesFx,
        () => ({
          1: {
            id: '1',
            title: 'test table',
            products: {
              3: {
                units: 1,
                id: '3',
                title: 'test product',
                needTimer: true,
                createdAt: new Date(),
                timerStatus: TableProductTimerStatuses.PLAY,
                eachProductUnitMinutesTimer: 20,
              },
            },
          },
        }),
      ],
    ],
  });

  await allSettled(tablesModel.getTablesFx, { scope });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toStrictEqual([]);
});

test(`addNotification should add notification to tableProductsTimersNotifications`, async () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, []]],
  });

  await allSettled(notificationsModel.addNotification, { scope, params });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toStrictEqual([params]);
});

test(`removeNotification should remove notification from tableProductsTimersNotifications`, async () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, [params]]],
  });

  await allSettled(notificationsModel.removeNotification, { scope, params });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toStrictEqual([]);
});
