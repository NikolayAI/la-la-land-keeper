import { allSettled, fork } from 'effector';

import { notificationsModel } from '../../../entities/notifications';
import { productsModel } from '../../../entities/products';
import { tablesModel } from '../../../entities/tables';
import { TableProductTimerStatuses } from '../../../shared/api';

test(`tableProductsTimersNotifications should take data when tablesProductsTimersOutOfLimits updated`, async () => {
  const scope = fork({
    values: [
      [productsModel.$products, {
        3: {
          id: '3',
          title: 'test product',
          price: 5,
          isPiece: true,
          needTimer: true,
          eachProductUnitMinutesTimer: 20,
        }
      }]
    ],
    handlers: [
      [tablesModel.getTablesFx, () => ({
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
            }
          },
        }
      })
      ],
    ]
  });

  await allSettled(tablesModel.getTablesFx, { scope });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toHaveLength(1);
});

test(`tableProductsTimersNotifications should not take data when tablesProductsTimersOutOfLimits updated`, async () => {
  const scope = fork({
    values: [
      [productsModel.$products, {
        3: {
          id: '3',
          title: 'test product',
          price: 5,
          isPiece: true,
          needTimer: true,
          eachProductUnitMinutesTimer: 20,
        }
      }]
    ],
    handlers: [[tablesModel.getTablesFx, () => ({
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
          }
        },
      }
    })]]
  });

  await allSettled(tablesModel.getTablesFx, { scope });

  expect(scope.getState(notificationsModel.$tableProductsTimersNotifications)).toStrictEqual([]);
});
