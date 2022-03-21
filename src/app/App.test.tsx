import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';

test('should render app', async () => {
  render(<App />);
  const linkElement = screen.getByText(/создать стол/i);
  expect(linkElement).toBeDefined();
});