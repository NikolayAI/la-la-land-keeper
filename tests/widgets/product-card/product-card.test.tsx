import { render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { TableProductTimerStatuses } from '@/shared';
import { ProductCard } from '@/widgets/product-card';

import { initWrapper } from '../../__lib__/component-wrapper';
import { table, tableProduct } from '../../__mocks__/fixtures';

test('should call decreaseTableProduct', async () => {
  const scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
  };

  render(
    <ProductCard tableId={table.id} tableProduct={testTableProduct} timerStatus={TableProductTimerStatuses.play} />,
    { wrapper: initWrapper(scope) }
  );

  const element = screen.getByRole(`decrease-table-product-count-button-${table.id}-${testTableProduct.id}`);

  expect(element).toBeDefined();
});
