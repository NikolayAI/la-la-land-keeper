import { fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { productsModel } from '@/entities/products';
import { productModel } from '@/features/product';
import { Header } from '@/widgets/header';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { products } from '../../../../__mocks__/fixtures';

describe('events', () => {
  const setAnchorElementFn = jest.fn();
  productModel.setRemoveAnchorEl.watch(setAnchorElementFn);

  const removeProductFn = jest.fn();
  productModel.removeProduct.watch(removeProductFn);

  beforeEach(() => {
    setAnchorElementFn.mockRestore();
  });

  test('should call setAnchorEl for remove product', () => {
    const scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<Header />, { wrapper: initWrapper(scope) });

    fireEvent.click(screen.getByRole('open-remove-product-form-button'));

    expect(setAnchorElementFn).toHaveBeenCalledTimes(1);
  });

  test('should call setAnchorEl and call removeProduct', () => {
    const scope = fork({
      values: [[productsModel.$products, products]],
    });

    render(<Header />, { wrapper: initWrapper(scope) });

    fireEvent.click(screen.getByText('Удалить товар'));
    fireEvent.click(screen.getByRole(`remove-product-box-${products['test-product-id'].id}`));

    expect(removeProductFn).toHaveBeenCalledTimes(1);
  });
});
