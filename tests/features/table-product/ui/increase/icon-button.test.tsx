import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { tableProductModel, TableProductUI } from '@/features/table-product';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should call increase when button clicked', () => {
  const fn = jest.fn();
  tableProductModel.increase.watch(fn);
  const scope = fork();

  render(<TableProductUI.Increase.IconBtn tableId={table.id} productId={tableProduct.id} />, {
    wrapper: initWrapper(scope),
  });

  act(() => {
    fireEvent.click(screen.getByRole(`increase-table-product-count-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
