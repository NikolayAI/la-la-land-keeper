import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly, TableProductTimerStatuses } from '@/shared';
import { TablesUI } from '@/entities/tables';
import { TableProductTimerUI } from '@/features/table-product-timer';

import { table, tableProduct, tablesProductsTimers } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should render stop timer button', () => {
  scope = fork();

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
        <TableProductTimerUI.Stop.IconBtn tableId={table.id} productId={tableProduct.id} pausedTimerCount={0} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.Play.IconBtn
          tableId={table.id}
          productId={tableProduct.id}
          pausedTimerCount={0}
          pausedAt={null}
        />
      }
    />,
    { wrapper: Wrapper }
  );

  const element = screen.getByRole(`stop-timer-button-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});

test('should render play timer button', () => {
  scope = fork();

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
        <TableProductTimerUI.Stop.IconBtn tableId={table.id} productId={tableProduct.id} pausedTimerCount={0} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.Play.IconBtn
          tableId={table.id}
          productId={tableProduct.id}
          pausedTimerCount={0}
          pausedAt={null}
        />
      }
    />,
    { wrapper: Wrapper }
  );

  const element = screen.getByRole(`play-timer-button-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});
