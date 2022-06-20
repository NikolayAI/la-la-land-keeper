import { render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { App } from '@/app';
import { initWrapper } from '../__lib__/component-wrapper';

test('should render app', () => {
  const scope = fork();

  render(<App />, { wrapper: initWrapper(scope) });

  const linkElement = screen.getByText(/создать стол/i);

  expect(linkElement).toBeDefined();
});
