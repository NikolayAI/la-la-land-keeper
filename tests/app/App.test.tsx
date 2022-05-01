import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { App } from '@/app';
import { IChildrenOnly } from '@/shared';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('should render app', () => {
  scope = fork();

  render(<App />, { wrapper: Wrapper });

  const linkElement = screen.getByText(/создать стол/i);

  expect(linkElement).toBeDefined();
});
