import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Notifications } from './ui';
import { NotificationKinds } from './constants';

const params = {
  tableId: '1',
  productId: '2',
  kind: NotificationKinds.INFO,
  message: 'notifications test',
};

test('should render Notifications component', async () => {
  render(<Notifications
    notifications={[params]}
    handleCloseNotification={() => {
    }} />
  );
  expect(screen.getAllByText('notifications test')).toBeDefined();
});

test('should call handler after onClose click', async () => {
  const fn = jest.fn();
  render(<Notifications
    notifications={[params]}
    handleCloseNotification={fn} />
  );
  fireEvent.click(screen.getByTitle('Close'));
  expect(fn).toHaveBeenCalledTimes(1);
});