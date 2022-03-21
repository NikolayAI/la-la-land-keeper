import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { TableProductTimer } from './ui';
import { TableProductTimerStatuses } from '../../shared/api';

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
      }
    }
  }
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
      }
    }
  },
}

describe('events', () => {
  const setTimerFn = jest.fn();
  const playTimerFn = jest.fn();
  const stopTimerFn = jest.fn();

  test('should call handleStopTimer', async () => {
    render(
      <TableProductTimer
        tables={tablesWithPlayTimerStatus}
        tableId="1"
        productId="2"
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
        handlePlayTimer={playTimerFn}
        handleStopTimer={stopTimerFn}
      />
    );

    fireEvent.click(screen.getByRole('pause-timer-button'));

    expect(stopTimerFn).toHaveBeenCalledTimes(1);
  });

  test('should call handlePlayTimer', async () => {
    render(
      <TableProductTimer
        tables={tablesWithStopTimerStatus}
        tableId="1"
        productId="2"
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
        handlePlayTimer={playTimerFn}
        handleStopTimer={stopTimerFn}
      />
    );

    fireEvent.click(screen.getByRole('play-timer-button'));

    expect(playTimerFn).toHaveBeenCalledTimes(1);
  });
});