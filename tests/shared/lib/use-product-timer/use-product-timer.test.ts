import React from 'react';

import * as calc from '@/shared/lib/use-product-timer/calculate-product-timer'; // eslint-disable-line no-restricted-imports
import { useProductTimer } from '@/shared/lib/use-product-timer/use-product-timer'; // eslint-disable-line no-restricted-imports

import { table, tableProduct } from '../../../__mocks__/fixtures';

jest.useFakeTimers();

const calculateTimerCountFn = jest.fn();
jest.spyOn(calc, 'calculateTimerCount').mockImplementation(() => calculateTimerCountFn());

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());
  jest.spyOn(React, 'useRef').mockReturnValueOnce({
    current: {
      intervalId: null,
      isTimerPlay: false,
      pausedAt: null,
      pausedTimerCount: 0,
    },
  });
});

test('useProductTimer should call set timer and lib calc function', () => {
  const setTimerFn = jest.fn();

  useProductTimer({
    tableId: table.id,
    productId: tableProduct.id,
    createdAt: tableProduct.createdAt,
    pausedAt: tableProduct.pausedAt,
    timerStatus: tableProduct.timerStatus,
    pausedTimerCount: tableProduct.pausedTimerCount,
    isTimerPlay: true,
    interval: 1000,
    setTimer: setTimerFn,
  });

  jest.runOnlyPendingTimers();

  expect(setTimerFn).toHaveBeenCalledTimes(2);
  expect(calculateTimerCountFn).toHaveBeenCalledTimes(2);
});
