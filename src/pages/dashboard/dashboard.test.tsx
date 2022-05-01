import { render } from '@testing-library/react';
import { allSettled, fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { DashBoardGate } from './model';
import { Dashboard } from './dashboard';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('when page has mounted should open gate', async () => {
  const fn = jest.fn();
  DashBoardGate.open.watch(fn);

  scope = fork();

  expect(DashBoardGate.status.getState()).toBe(false);

  render(<Dashboard />, { wrapper: Wrapper });

  expect(fn).toHaveBeenCalledTimes(1);
});

test('when gate has opened should call getProducts and getTables', async () => {
  const getProducts = jest.fn();
  const getTables = jest.fn();

  const scope = fork({
    handlers: [
      [productsModel.getProductsFx, getProducts],
      [tablesModel.getTablesFx, getTables],
    ],
  });

  await allSettled(DashBoardGate.open, { scope, params: true });

  expect(getProducts).toHaveBeenCalledTimes(1);
  expect(getTables).toHaveBeenCalledTimes(1);
});
