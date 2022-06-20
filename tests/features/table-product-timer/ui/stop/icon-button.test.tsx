import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { tableProductTimerModel, TableProductTimerUI } from '@/features/table-product-timer';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should call stop timer', () => {
  const fn = jest.fn();
  tableProductTimerModel.stop.watch(fn);
  const scope = fork();

  render(
    <TableProductTimerUI.Stop.IconBtn
      tableId={table.id}
      productId={tableProduct.id}
      pausedTimerCount={tableProduct.pausedTimerCount}
    />,
    { wrapper: initWrapper(scope) }
  );

  act(() => {
    fireEvent.click(screen.getByRole(`stop-timer-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
