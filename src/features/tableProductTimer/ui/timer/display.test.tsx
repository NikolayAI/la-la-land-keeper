import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { TableProductTimerStatuses } from 'shared/api';
import { play } from '../../model/play';
import { stop } from '../../model/stop';
import { Display } from './display';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

const tablesWithPlayTimerStatus = {
  '1': {
    id: '1',
    title: 'test table',
    products: {
      '2': {
        id: '2',
        title: 'test product',
        price: 12,
        isPiece: true,
        needTimer: false,
        eachProductUnitMinutesTimer: 0,
        units: 1,
        createdAt: new Date(),
        timerStatus: TableProductTimerStatuses.PLAY,
      },
    },
  },
};

const tablesWithStopTimerStatus = {
  ...tablesWithPlayTimerStatus,
  1: {
    ...tablesWithPlayTimerStatus['1'],
    products: {
      ...tablesWithPlayTimerStatus['1'].products,
      2: {
        ...tablesWithPlayTimerStatus['1'].products['2'],
        timerStatus: TableProductTimerStatuses.STOP,
      },
    },
  },
};

describe('events', () => {
  const setTimerFn = jest.fn();

  const playTimerFn = jest.fn();
  play.watch(playTimerFn);

  const stopTimerFn = jest.fn();
  stop.watch(stopTimerFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call handleStopTimer', async () => {
    render(
      <Display
        tables={tablesWithPlayTimerStatus}
        tableId="1"
        productId="2"
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('pause-timer-button'));
    });

    expect(stopTimerFn).toHaveBeenCalledTimes(1);
  });

  test('should call handlePlayTimer', async () => {
    render(
      <Display
        tables={tablesWithStopTimerStatus}
        tableId="1"
        productId="2"
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('play-timer-button'));
    });

    expect(playTimerFn).toHaveBeenCalledTimes(1);
  });
});
