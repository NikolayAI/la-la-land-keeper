import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { notificationsModel, NotificationsUI } from '@/entities/computed/notifications';

import { initWrapper } from '../../../../../__lib__/component-wrapper';
import { notification } from '../../../../../__mocks__/fixtures';

test('should render Notifications component', () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, [notification]]],
  });

  render(<NotificationsUI.Notifications />, { wrapper: initWrapper(scope) });

  expect(screen.getByText('notifications test')).toBeDefined();
});

test('should call handler after onClose click', () => {
  const scope = fork({
    values: [[notificationsModel.$tableProductsTimersNotifications, [notification]]],
  });
  const removeNotificationFn = jest.fn();
  notificationsModel.removeNotification.watch(removeNotificationFn);

  render(<NotificationsUI.Notifications />, { wrapper: initWrapper(scope) });

  act(() => {
    fireEvent.click(screen.getByTitle('Close'));
  });

  expect(removeNotificationFn).toHaveBeenCalledTimes(1);
});
