import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Notifications } from './ui';

test('should render Notifications component', () => {
  render(<Notifications handleCloseNotification={() => {}} />);
  expect(screen.getAllByText('notifications test')).toBeDefined();
});

test('should call handler after onClose click', () => {
  const fn = jest.fn();
  render(<Notifications handleCloseNotification={fn} />);
  fireEvent.click(screen.getByTitle('Close'));
  expect(fn).toHaveBeenCalledTimes(1);
});
