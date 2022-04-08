import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { AddProductToTable } from './ui';
import { addProductToTable, setAnchorEl } from './model';

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

  test('should call setAnchorElFn for open form', async () => {
    render(<AddProductToTable products={products} tableId="1" />);

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-button'));
    });

    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });

  test('should call addProductToTable and setAnchorElFn for add product', async () => {
    render(<AddProductToTable products={products} tableId="1" />);

    act(() => {
      fireEvent.click(screen.getByRole('add-product-to-table-menu-item'));
    });

    expect(addProductToTableFn).toHaveBeenCalledTimes(1);
    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });
});
