import React from 'react';
import { render } from '@testing-library/react';
import { allSettled, fork } from 'effector';

import { Dashboard } from './ui';
import { DashBoardGate } from './model';
import { productsModel } from '@entities/products';
import { tablesModel } from '@entities/tables';

test('when page has mounted should open gate', async () => {
  expect(DashBoardGate.status.getState()).toBe(false);

  render(<Dashboard />);

  expect(DashBoardGate.status.getState()).toBe(true);
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
