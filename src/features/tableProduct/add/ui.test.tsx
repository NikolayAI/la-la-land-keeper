import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import { productsModel } from 'entities/products';
import React from 'react';

import { products } from 'tests/__mocks__/fixtures';
import { addProductToTable, setAnchorEl } from './model';
import { IconBtn } from './ui';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const addProductToTableFn = jest.fn();
  addProductToTable.watch(addProductToTableFn);

  const setAnchorElFn = jest.fn();
  setAnchorEl.watch(setAnchorElFn);

  test('should call setAnchorElFn for open form', async () => {
    scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<IconBtn tableId="1" />, {
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

    render(<IconBtn tableId="1" />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-menu-item'));
    });

    expect(addProductToTableFn).toHaveBeenCalledTimes(1);
    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });
});
