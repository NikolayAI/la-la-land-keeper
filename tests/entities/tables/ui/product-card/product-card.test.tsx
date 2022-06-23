import { render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { TablesUI } from '@/entities/tables';
import { TableProductUI } from '@/features/table-product';
import { ProductTimer } from '@/widgets/product-timer';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('if product is not is piece should call removeProductFromTable', () => {
  const scope = fork();
  const testTableProduct = {
    ...tableProduct,
    isPiece: false,
  };

  render(
    <TablesUI.ProductCard
      tableProduct={testTableProduct}
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
    { wrapper: initWrapper(scope) }
  );

  const element = screen.getByRole(`remove-table-product-button-${table.id}-${testTableProduct.id}`);

  expect(element).toBeDefined();
});

test('product card should display timer if product need timer', () => {
  const scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
    needTimer: true,
  };

  render(
    <TablesUI.ProductCard
      tableProduct={testTableProduct}
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
    { wrapper: initWrapper(scope) }
  );

  const element = screen.getByRole(`product-timer-${table.id}-${tableProduct.id}`);

  expect(element).toBeDefined();
});
