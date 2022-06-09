import { fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productsModel } from '@/entities/products';
import { productModel } from '@/features/product';
import { Header } from '@/widgets/header';

import { products } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

describe('events', () => {
  const setAnchorElementFn = jest.fn();
  productModel.setRemoveAnchorEl.watch(setAnchorElementFn);

  const removeProductFn = jest.fn();
  productModel.removeProduct.watch(removeProductFn);

  beforeEach(() => {
    setAnchorElementFn.mockRestore();
  });

  test('should call setAnchorEl for remove product', () => {
    scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<Header />, { wrapper: Wrapper });

    fireEvent.click(screen.getByRole('open-remove-product-form-button'));

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
  });

  test('should call setAnchorEl and call removeProduct', () => {
    scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<Header />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Удалить товар'));
    fireEvent.click(screen.getByRole(`remove-product-box-${products['test-product-id'].id}`));

    expect(removeProductFn).toHaveBeenCalledTimes(1);
  });
});
