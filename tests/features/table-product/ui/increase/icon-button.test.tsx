import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { TableProductUI, tableProductModel } from '@/features/table-product';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should call increase when button clicked', () => {
  const fn = jest.fn();
  tableProductModel.increase.watch(fn);
  scope = fork();

  render(<TableProductUI.Increase.IconBtn tableId={table.id} productId={tableProduct.id} />, { wrapper: Wrapper });

  act(() => {
    fireEvent.click(screen.getByRole(`increase-table-product-count-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
