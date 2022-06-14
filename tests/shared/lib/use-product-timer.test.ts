import React from 'react';

import { useProductTimer } from '@/shared';

import { table, tableProduct } from '../../__mocks__/fixtures';

jest.useFakeTimers();
jest.spyOn(window, 'clearInterval');

beforeEach(() => {
  jest.spyOn(React, 'useRef').mockReturnValueOnce({
    current: {
      intervalId: null,
      isTimerPlay: false,
      pausedAt: null,
      pausedTimerCount: 0,
    },
  });
  jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());
});
//
// test(`should call clear interval after timer status changed if timer is stopped`, () => {
//   jest.spyOn(React, 'useRef').mockReturnValueOnce({
//     current: {
//       intervalId: null,
//       isTimerPlay: false,
//       pausedAt: null,
//       pausedTimerCount: 0,
//     },
//   });
//
//   const fn = jest.fn();
//
//   useProductTimer({
//     tableId: table.id,
//     productId: tableProduct.id,
//     createdAt: tableProduct.createdAt,
//     pausedAt: tableProduct.pausedAt,
//     timerStatus: tableProduct.timerStatus,
//     pausedTimerCount: tableProduct.pausedTimerCount,
//     isTimerPlay: false,
//     interval: 1,
//     setTimer: fn,
//   });
//
//   expect(clearInterval).toHaveBeenCalledTimes(1);
// });

test(`should call set timer`, () => {
  jest.spyOn(React, 'useRef').mockReturnValueOnce({
    current: {
      intervalId: 1,
      isTimerPlay: false,
      pausedAt: null,
      pausedTimerCount: 0,
    },
  });
  const fn = jest.fn();

  useProductTimer({
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
