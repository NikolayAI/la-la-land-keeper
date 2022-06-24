import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { tableProductTimerModel, TableProductTimerUI } from '@/features/table-product-timer';

import { IconBtn as PlayIconBtn } from '../../../../../src/features/table-product-timer/ui/play';
import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should call play timer', () => {
  const fn = jest.fn();
  tableProductTimerModel.play.watch(fn);
  const scope = fork();

  render(
    <TableProductTimerUI.PlayIconBtn
      tableId={table.id}
      productId={tableProduct.id}
      pausedTimerCount={tableProduct.pausedTimerCount}
      pausedAt={tableProduct.pausedAt}
    />,
    { wrapper: initWrapper(scope) }
  );

  act(() => {
    fireEvent.click(screen.getByRole(`play-timer-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
