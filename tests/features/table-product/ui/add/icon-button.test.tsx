import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productsModel } from '@/entities/products';
import { tableProductModel, TableProductUI } from '@/features/table-product';
import { products } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const addProductToTableFn = jest.fn();
  tableProductModel.add.watch(addProductToTableFn);

  const setAnchorElFn = jest.fn();
  tableProductModel.setAnchorEl.watch(setAnchorElFn);

  test('should call setAnchorElFn for open form', async () => {
    scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<TableProductUI.Add.IconBtn tableId="1" />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-button-1'));
    });

    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });

  test('should call addProductToTable and setAnchorElFn for add product', async () => {
    scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<TableProductUI.Add.IconBtn tableId="1" />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-menu-item'));
    });

    expect(addProductToTableFn).toHaveBeenCalledTimes(1);
    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });
});