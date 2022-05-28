import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly, TableProductTimerStatuses } from '@/shared';
import { ProductsUI } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { tableProductModel, TableProductUI } from '@/features/table-product';
import { TableProductTimerUI } from '@/features/table-product-timer';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

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

    render(
      <ProductsUI.ProductCard
        tableProduct={testTableProduct}
        timerStatus={testTableProduct.timerStatus}
        isProductTimerOut={true}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
            timerStatus={testTableProduct.timerStatus}
            pausedTimerCount={testTableProduct.pausedTimerCount}
            pausedAt={testTableProduct.pausedAt}
            tableId={table.id}
            productId={testTableProduct.id}
            createdAt={testTableProduct.createdAt}
            minutesLimit={testTableProduct.eachProductUnitMinutesTimer}
            productUnits={testTableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn tableId={table.id} productId={testTableProduct.id} />
        }
        RemoveTableProductSlot={<TableProductUI.Remove.IconBtn tableId={table.id} productId={testTableProduct.id} />}
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={testTableProduct.id}
            productUnits={testTableProduct.units}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`decrease-table-product-count-button-${table.id}-${testTableProduct.id}`));
    });

    expect(decreaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('should call removeProductFromTable', async () => {
    scope = fork();

    render(
      <ProductsUI.ProductCard
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.play}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
            timerStatus={tableProduct.timerStatus}
            pausedTimerCount={tableProduct.pausedTimerCount}
            pausedAt={tableProduct.pausedAt}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={<TableProductUI.Increase.IconBtn tableId={table.id} productId={tableProduct.id} />}
        RemoveTableProductSlot={<TableProductUI.Remove.IconBtn tableId={table.id} productId={tableProduct.id} />}
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
      fireEvent.click(screen.getByRole(`remove-table-product-button-${table.id}-${tableProduct.id}`));
    });

    expect(removeProductFromTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call increaseProductFromTable', async () => {
    scope = fork();

    render(
      <ProductsUI.ProductCard
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.play}
        isProductTimerOut={false}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
            timerStatus={tableProduct.timerStatus}
            pausedTimerCount={tableProduct.pausedTimerCount}
            pausedAt={tableProduct.pausedAt}
            tableId={table.id}
            productId={tableProduct.id}
            createdAt={tableProduct.createdAt}
            minutesLimit={tableProduct.eachProductUnitMinutesTimer}
            productUnits={tableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={<TableProductUI.Increase.IconBtn tableId={table.id} productId={tableProduct.id} />}
        RemoveTableProductSlot={<TableProductUI.Remove.IconBtn tableId={table.id} productId={tableProduct.id} />}
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
      fireEvent.click(screen.getByRole(`increase-table-product-count-button-${table.id}-${tableProduct.id}`));
    });

    expect(increaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('product card should have correct background color', async () => {
    scope = fork();
    const testTableProduct = {
      ...tableProduct,
      units: 2,
    };

    render(
      <ProductsUI.ProductCard
        tableProduct={testTableProduct}
        timerStatus={testTableProduct.timerStatus}
        isProductTimerOut={true}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
            timerStatus={testTableProduct.timerStatus}
            pausedTimerCount={testTableProduct.pausedTimerCount}
            pausedAt={testTableProduct.pausedAt}
            tableId={table.id}
            productId={testTableProduct.id}
            createdAt={testTableProduct.createdAt}
            minutesLimit={testTableProduct.eachProductUnitMinutesTimer}
            productUnits={testTableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn tableId={table.id} productId={testTableProduct.id} />
        }
        RemoveTableProductSlot={<TableProductUI.Remove.IconBtn tableId={table.id} productId={testTableProduct.id} />}
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={testTableProduct.id}
            productUnits={testTableProduct.units}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByRole(`table-product-paper-${tableProduct.id}`)).toHaveStyle('backgroundColor: #d32f2f');
  });

  test('product card should display timer if product need timer', async () => {
    scope = fork();
    const testTableProduct = {
      ...tableProduct,
      units: 2,
      needTimer: true,
    };

    render(
      <ProductsUI.ProductCard
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.play}
        isProductTimerOut={true}
        TableProductTimerSlot={
          <TableProductTimerUI.Timer.Display
            timerStatus={testTableProduct.timerStatus}
            pausedTimerCount={testTableProduct.pausedTimerCount}
            pausedAt={testTableProduct.pausedAt}
            tableId={table.id}
            productId={testTableProduct.id}
            createdAt={testTableProduct.createdAt}
            minutesLimit={testTableProduct.eachProductUnitMinutesTimer}
            productUnits={testTableProduct.units}
            setTimer={tablesModel.setTablesProductsTimers}
          />
        }
        IncreaseTableProductSlot={
          <TableProductUI.Increase.IconBtn tableId={table.id} productId={testTableProduct.id} />
        }
        RemoveTableProductSlot={<TableProductUI.Remove.IconBtn tableId={table.id} productId={testTableProduct.id} />}
        DecreaseTableProductSlot={
          <TableProductUI.Decrease.IconBtn
            tableId={table.id}
            productId={testTableProduct.id}
            productUnits={testTableProduct.units}
          />
        }
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByRole(`product-timer-display-${table.id}-${tableProduct.id}`)).toBeDefined();
  });
});
