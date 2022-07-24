import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { productModel } from '@/features/product';
import { tableModel } from '@/features/table';
import { Header } from '@/widgets/header';

import { initWrapper } from '../../__lib__/component-wrapper';

describe('events', () => {
  const createTableFn = jest.fn();
  tableModel.create.watch(createTableFn);

  const openCreateProductModalFn = jest.fn();
  productModel.openCreateForm.watch(openCreateProductModalFn);

  test('should call createTable', async () => {
    const scope = fork();

    render(<Header />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByRole('create-table-button'));
    });

    expect(createTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call openCreateProductModal', async () => {
    const scope = fork();

    render(<Header />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByRole('open-create-product-form-button'));
    });

    expect(openCreateProductModalFn).toHaveBeenCalledTimes(1);
  });
});
