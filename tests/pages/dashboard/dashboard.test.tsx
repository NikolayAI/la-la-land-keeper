import { render } from '@testing-library/react';
import { allSettled, fork } from 'effector';
import React from 'react';

import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { Dashboard, DashBoardGate } from '@/pages/dashboard';

import { initWrapper } from '../../__lib__/component-wrapper';

test('when page has mounted should open gate', async () => {
  const fn = jest.fn();
  DashBoardGate.open.watch(fn);

  const scope = fork();

  expect(DashBoardGate.status.getState()).toBe(false);

  render(<Dashboard />, { wrapper: initWrapper(scope) });

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
