import React from 'react';

import * as timer from '@/shared/lib/use-product-timer';

import { table, tableProduct } from '../../__mocks__/fixtures';

jest.useFakeTimers();

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

test('should call set timer', () => {
  const fn = jest.fn();

  timer.useProductTimer({
    tableId: table.id,
    productId: tableProduct.id,
    createdAt: tableProduct.createdAt,
    pausedAt: tableProduct.pausedAt,
    timerStatus: tableProduct.timerStatus,
    pausedTimerCount: tableProduct.pausedTimerCount,
    isTimerPlay: true,
    interval: 1000,
    setTimer: fn,
  });

  jest.runOnlyPendingTimers();

  expect(fn).toHaveBeenCalledTimes(2);
});
