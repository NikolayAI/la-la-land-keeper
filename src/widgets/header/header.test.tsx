import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productModel } from '@/features/product';
import { tableModel } from '@/features/table';
import { Header } from './header';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const createTableFn = jest.fn();
  tableModel.create.watch(createTableFn);

  const openCreateProductModalFn = jest.fn();
  productModel.openModal.watch(openCreateProductModalFn);

  beforeEach(() => {
    scope = fork();
  });

  test('should call createTable', async () => {
    render(<Header />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByRole('create-table-header-button'));
    });

    expect(createTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call openCreateProductModal', async () => {
    render(<Header />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(
        screen.getByRole('open-create-product-modal-header-button')
      );
    });

    expect(openCreateProductModalFn).toHaveBeenCalledTimes(1);
  });
});
