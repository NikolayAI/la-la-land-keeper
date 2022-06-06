import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { TableProductTimerUI, tableProductTimerModel } from '@/features/table-product-timer';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should call play timer', () => {
  const fn = jest.fn();
  tableProductTimerModel.play.watch(fn);
  scope = fork();

  render(
    <TableProductTimerUI.Play.IconBtn
      tableId={table.id}
      productId={tableProduct.id}
      pausedTimerCount={tableProduct.pausedTimerCount}
      pausedAt={tableProduct.pausedAt}
    />,
    { wrapper: Wrapper }
  );

  act(() => {
    fireEvent.click(screen.getByRole(`play-timer-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
