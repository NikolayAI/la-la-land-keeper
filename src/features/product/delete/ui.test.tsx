import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { DeleteProduct } from './ui';
import { deleteProduct, setAnchorEl } from './model';

const products = {
  1: {
    id: '1',
    title: 'test',
    price: 12,
    isPiece: true,
    needTimer: true,
    eachProductUnitMinutesTimer: 1,
  },
};
describe('events', () => {
  const setAnchorElementFn = jest.fn();
  setAnchorEl.watch(setAnchorElementFn);

  const deleteProductFn = jest.fn();
  deleteProduct.watch(deleteProductFn);

  test('should call setAnchorEl for delete product', async () => {
    render(<DeleteProduct products={products} />);

    act(() => {
      fireEvent.click(screen.getByText('Удалить товар'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
  });

  test('should call setAnchorEl and deleteProduct', async () => {
    render(<DeleteProduct products={products} />);

    act(() => {
      fireEvent.click(screen.getByRole('delete-product-box'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
    expect(deleteProductFn).toHaveBeenCalledTimes(1);
  });
});
