import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import { addProductToTable, setAnchorEl } from './model';
import { AddProductToTable } from './ui';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

const products = {
  '1': {
    id: '1',
    title: 'test',
    price: 12,
    isPiece: true,
    needTimer: false,
    eachProductUnitMinutesTimer: 0,
  },
};

describe('events', () => {
  const addProductToTableFn = jest.fn();
  addProductToTable.watch(addProductToTableFn);

  const setAnchorElFn = jest.fn();
  setAnchorEl.watch(setAnchorElFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call setAnchorElFn for open form', async () => {
    render(<AddProductToTable products={products} tableId="1" />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-button-1'));
    });

    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });

  test('should call addProductToTable and setAnchorElFn for add product', async () => {
    render(<AddProductToTable products={products} tableId="1" />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-menu-item'));
    });

    expect(addProductToTableFn).toHaveBeenCalledTimes(1);
    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });
});
