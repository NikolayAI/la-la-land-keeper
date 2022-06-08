import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { TableProductUI, tableProductModel } from '@/features/table-product';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should call decrease when button clicked', () => {
  const fn = jest.fn();
  tableProductModel.decrease.watch(fn);
  scope = fork();

  render(
    <TableProductUI.Decrease.IconBtn
      tableId={table.id}
      productId={tableProduct.id}
      productUnits={tableProduct.units}
    />,
    { wrapper: Wrapper }
  );

  act(() => {
    fireEvent.click(screen.getByRole(`decrease-table-product-count-button-${table.id}-${tableProduct.id}`));
  });

  expect(fn).toHaveBeenCalledTimes(1);
});
