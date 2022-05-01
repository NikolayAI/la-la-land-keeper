import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import {
  NotificationKinds,
  NotificationsUI,
  notificationsModel,
} from '@/entities/computed/notifications';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('should render Notifications component', () => {
  scope = fork({
    values: [
      [
        notificationsModel.$tableProductsTimersNotifications,
        [
          {
            tableId: 'test-table-id',
            productId: 'test-table-product-id',
            kind: NotificationKinds.ERROR,
            message: 'notifications test',
          },
        ],
      ],
    ],
  });

  render(<NotificationsUI.Notifications />, { wrapper: Wrapper });

  expect(screen.getByText('notifications test')).toBeDefined();
});

test('should call handler after onClose click', () => {
  const removeNotificationFn = jest.fn();
  notificationsModel.removeNotification.watch(removeNotificationFn);

  render(<NotificationsUI.Notifications />, { wrapper: Wrapper });

  act(() => {
    fireEvent.click(screen.getByTitle('Close'));
  });

  expect(removeNotificationFn).toHaveBeenCalledTimes(1);
});
