import { render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { TableProductTimerStatuses } from '@/shared';
import { TablesUI } from '@/entities/tables';
import { TableProductTimerUI } from '@/features/table-product-timer';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tableProduct, tablesProductsTimers } from '../../../../__mocks__/fixtures';

test('should render stop timer button', () => {
  const scope = fork();

  render(
    <TablesUI.ProductTimer
      setTimer={() => {}}
      tablesProductsTimers={tablesProductsTimers}
      timerStatus={TableProductTimerStatuses.play}
      pausedTimerCount={0}
      pausedAt={null}
      tableId={table.id}
      productId={tableProduct.id}
      createdAt={new Date()}
      minutesLimit={20}
      productUnits={1}
      StopTimerSlot={
        <TableProductTimerUI.StopIconBtn tableId={table.id} productId={tableProduct.id} pausedTimerCount={0} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.PlayIconBtn
          tableId={table.id}
          productId={tableProduct.id}
          pausedTimerCount={0}
          pausedAt={null}
        />
      }
    />,
    { wrapper: initWrapper(scope) }
  );

  const element = screen.getByRole(`stop-timer-button-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});

test('should render play timer button', () => {
  const scope = fork();

  render(
    <TablesUI.ProductTimer
      setTimer={() => {}}
      tablesProductsTimers={tablesProductsTimers}
      timerStatus={TableProductTimerStatuses.stop}
      pausedTimerCount={0}
      pausedAt={null}
      tableId={table.id}
      productId={tableProduct.id}
      createdAt={new Date()}
      minutesLimit={20}
      productUnits={1}
      StopTimerSlot={
        <TableProductTimerUI.StopIconBtn tableId={table.id} productId={tableProduct.id} pausedTimerCount={0} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.PlayIconBtn
          tableId={table.id}
          productId={tableProduct.id}
          pausedTimerCount={0}
          pausedAt={null}
        />
      }
    />,
    { wrapper: initWrapper(scope) }
  );

  const element = screen.getByRole(`play-timer-button-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});
