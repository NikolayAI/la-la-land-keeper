import { allSettled, fork } from 'effector';

import { NotificationKinds, notificationsModel } from './index';

const params = {
  tableId: '1',
  productId: '2',
  kind: NotificationKinds.INFO,
  message: 'test',
};

test(`addNotification should add notification to tableProductsTimersNotifications`, async () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, []]],
  });

  await allSettled(notificationsModel.addNotification, { scope, params });

  expect(
    scope.getState(notificationsModel.$tableProductsTimersNotifications)
  ).toStrictEqual([params]);
});

test(`deleteNotification should delete notification from tableProductsTimersNotifications`, async () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, [params]]],
  });

  await allSettled(notificationsModel.deleteNotification, {
    scope,
    params: {
      tableId: '1',
      productId: '2',
    },
  });

  expect(
    scope.getState(notificationsModel.$tableProductsTimersNotifications)
  ).toStrictEqual([]);
});
