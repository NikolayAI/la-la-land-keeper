import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { TableProductTimerStatuses } from 'shared/api';
import { tablesModel } from 'entities/tables';
import { TableProductTimerUI } from 'features/table-product-timer';
import { tableProductModel, TableProductUI } from 'features/table-product';
import { table, tableProduct, tables } from 'tests/__mocks__/fixtures';
import { ProductCard } from './index';

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
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
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
        RemoveTableProductSlot={
          <TableProductUI.Remove.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
            productUnits={testTableProduct.units}
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
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
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
        RemoveTableProductSlot={
          <TableProductUI.Remove.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
            productUnits={tableProduct.units}
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

  test('should call increaseProductFromTable', async () => {
    scope = fork();

    render(
      <ProductCard
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
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
        RemoveTableProductSlot={
          <TableProductUI.Remove.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
            productUnits={tableProduct.units}
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
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
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
        RemoveTableProductSlot={
          <TableProductUI.Remove.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
          />
        }
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={tableProduct.id}
            productUnits={tableProduct.units}
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
