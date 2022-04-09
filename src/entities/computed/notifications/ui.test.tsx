import React from 'react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import { act, fireEvent, render, screen } from '@testing-library/react';

import * as notificationsModel from './model';
import { NotificationKinds } from './constants';
import { Notifications } from './ui';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
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

  render(<Notifications handleCloseNotification={() => {}} />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText('notifications test')).toBeDefined();
});

test('should call handler after onClose click', () => {
  const fn = jest.fn();

  render(<Notifications handleCloseNotification={fn} />, { wrapper: Wrapper });

  act(() => {
    fireEvent.click(screen.getByTitle('Close'));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
