import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productModel, ProductUI } from '@/features/product';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);
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
  productModel.setAnchorEl.watch(setAnchorElementFn);

  const removeProductFn = jest.fn();
  productModel.removeProduct.watch(removeProductFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call setAnchorEl for remove product', async () => {
    render(<ProductUI.Remove.Menu products={products} />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByText('Удалить товар'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
  });

  test('should call setAnchorEl and removeProduct', async () => {
    render(<ProductUI.Remove.Menu products={products} />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByRole('remove-product-box'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
    expect(removeProductFn).toHaveBeenCalledTimes(1);
  });
});
