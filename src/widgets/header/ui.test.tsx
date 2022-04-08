import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { Header } from './ui';
import { createTable } from 'features/table';
import { openCreateProductModal } from 'features/product';

describe('events', () => {
  const createTableFn = jest.fn();
  createTable.watch(createTableFn);

  const openCreateProductModalFn = jest.fn();
  openCreateProductModal.watch(openCreateProductModalFn);

  test('should call createTable', async () => {
    render(<Header />);

    act(() => {
      fireEvent.click(screen.getByRole('create-table-header-button'));
    });

    expect(createTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call openCreateProductModal', async () => {
    render(<Header />);

    act(() => {
      fireEvent.click(
        screen.getByRole('open-create-product-modal-header-button')
      );
    });

    expect(openCreateProductModalFn).toHaveBeenCalledTimes(1);
  });
});
