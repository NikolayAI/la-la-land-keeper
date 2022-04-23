import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { TableProductTimerStatuses } from 'shared/api';
import { tableProductModel, TableProductUI } from 'features/tableProduct';
import { table, tableProduct, tables } from 'tests/__mocks__/fixtures';
import { ProductCard } from './ui';
import { TableProductTimerUI } from 'features/tableProductTimer';
import { tablesModel } from 'entities/tables';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const decreaseTableProductFn = jest.fn();
  tableProductModel.decrease.watch(decreaseTableProductFn);

  const removeProductFromTableFn = jest.fn();
  tableProductModel.remove.watch(removeProductFromTableFn);

  const increaseTableProductFn = jest.fn();
  tableProductModel.increase.watch(increaseTableProductFn);

  test('should call decreaseTableProduct', async () => {
    scope = fork();
    const testTableProduct = {
      ...tableProduct,
      units: 2,
    };
    const testTables = {
      [table.id]: {
        ...table,
        products: {
          [tableProduct.id]: testTableProduct,
        },
      },
    };

    render(
      <ProductCard
        tableId={table.id}
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        TableProductTimerSlot={
          <TableProductTimerUI.Display
            tables={testTables}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('decrease-table-product-count-button'));
    });

    expect(decreaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('should call removeProductFromTable', async () => {
    scope = fork();

    render(
      <ProductCard
        tableId={table.id}
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        TableProductTimerSlot={
          <TableProductTimerUI.Display
            tables={tables}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('decrease-table-product-count-button'));
    });

    expect(removeProductFromTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call removeProductFromTable', async () => {
    scope = fork();

    render(
      <ProductCard
        tableId={table.id}
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        TableProductTimerSlot={
          <TableProductTimerUI.Display
            tables={tables}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('increase-table-product-count-button'));
    });

    expect(increaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('should call removeProductFromTable', async () => {
    scope = fork();
    const testTableProduct = {
      ...tableProduct,
      isPiece: false,
    };
    const testTables = {
      [table.id]: {
        ...table,
        products: {
          [tableProduct.id]: testTableProduct,
        },
      },
    };

    render(
      <ProductCard
        tableId={table.id}
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        TableProductTimerSlot={
          <TableProductTimerUI.Display
            tables={testTables}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole('delete-table-product-button'));
    });

    expect(removeProductFromTableFn).toHaveBeenCalledTimes(1);
  });
});
