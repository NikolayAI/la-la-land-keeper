import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly, TableProductTimerStatuses } from '@/shared';
import { TablesUI } from '@/entities/tables';
import { TableProductUI } from '@/features/table-product';
import { ProductTimer } from '@/widgets/product-timer';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('if product is not is piece should call removeProductFromTable', () => {
  scope = fork();
  const testTableProduct = {
    ...tableProduct,
    isPiece: false,
  };

  render(
    <TablesUI.ProductCard
      tableProduct={testTableProduct}
      timerStatus={TableProductTimerStatuses.play}
      isProductTimerOut={false}
      TableProductTimerSlot={
        <ProductTimer
          timerStatus={testTableProduct.timerStatus}
          pausedTimerCount={testTableProduct.pausedTimerCount}
          pausedAt={testTableProduct.pausedAt}
          tableId={table.id}
          productId={testTableProduct.id}
          createdAt={testTableProduct.createdAt}
          minutesLimit={testTableProduct.eachProductUnitMinutesTimer}
          productUnits={testTableProduct.units}
        />
      }
      IncreaseTableProductSlot={<TableProductUI.Increase.IconBtn tableId={table.id} productId={testTableProduct.id} />}
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

  const element = screen.getByRole(`remove-table-product-button-${table.id}-${testTableProduct.id}`);

  expect(element).toBeDefined();
});

test('product card should display timer if product need timer', () => {
  scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
    needTimer: true,
  };

  render(
    <TablesUI.ProductCard
      tableProduct={testTableProduct}
      timerStatus={TableProductTimerStatuses.play}
      isProductTimerOut={true}
      TableProductTimerSlot={
        <ProductTimer
          timerStatus={testTableProduct.timerStatus}
          pausedTimerCount={testTableProduct.pausedTimerCount}
          pausedAt={testTableProduct.pausedAt}
          tableId={table.id}
          productId={testTableProduct.id}
          createdAt={testTableProduct.createdAt}
          minutesLimit={testTableProduct.eachProductUnitMinutesTimer}
          productUnits={testTableProduct.units}
        />
      }
      IncreaseTableProductSlot={<TableProductUI.Increase.IconBtn tableId={table.id} productId={testTableProduct.id} />}
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

  const element = screen.getByRole(`product-timer-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});
