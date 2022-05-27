import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly, TableProductTimerStatuses } from '@/shared';
import { TableProductTimerUI, tableProductTimerModel } from '@/features/table-product-timer';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

describe('events', () => {
  const setTimerFn = jest.fn();

  const playTimerFn = jest.fn();
  tableProductTimerModel.play.watch(playTimerFn);

  const stopTimerFn = jest.fn();
  tableProductTimerModel.stop.watch(stopTimerFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call handleStopTimer', async () => {
    render(
      <TableProductTimerUI.Timer.Display
        timerStatus={TableProductTimerStatuses.play}
        pausedTimerCount={0}
        pausedAt={null}
        tableId={table.id}
        productId={tableProduct.id}
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`pause-timer-button-${table.id}-${tableProduct.id}`));
    });

    expect(stopTimerFn).toHaveBeenCalledTimes(1);
  });

  test('should call handlePlayTimer', async () => {
    render(
      <TableProductTimerUI.Timer.Display
        timerStatus={TableProductTimerStatuses.stop}
        pausedTimerCount={0}
        pausedAt={null}
        tableId={table.id}
        productId={tableProduct.id}
        createdAt={new Date()}
        minutesLimit={20}
        productUnits={1}
        setTimer={setTimerFn}
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`play-timer-button-${table.id}-${tableProduct.id}`));
    });

    expect(playTimerFn).toHaveBeenCalledTimes(1);
  });
});
