import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { removeProduct, setAnchorEl } from '../../model/remove/model';
import { Menu } from './menu';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
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
  setAnchorEl.watch(setAnchorElementFn);

  const removeProductFn = jest.fn();
  removeProduct.watch(removeProductFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call setAnchorEl for remove product', async () => {
    render(<Menu products={products} />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByText('Удалить товар'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
  });

  test('should call setAnchorEl and removeProduct', async () => {
    render(<Menu products={products} />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByRole('remove-product-box'));
    });

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
    expect(removeProductFn).toHaveBeenCalledTimes(1);
  });
});
