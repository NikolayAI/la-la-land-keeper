import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { CreateProductModal } from './ui';
import { createProduct, openCreateProductModal } from './model';
import { productsModel } from 'entities/products';

describe('events', () => {
  const createProductFn = jest.fn();
  createProduct.watch(createProductFn);

  const setProductPropertyFn = jest.fn();
  productsModel.setProductProperty.watch(setProductPropertyFn);

  beforeEach(() => {
    openCreateProductModal();
  });

  test('should call createProduct handler', async () => {
    render(<CreateProductModal />);

    act(() => {
      fireEvent.click(screen.getByText('Создать'));
    });

    expect(createProductFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Название товара" should call productsModel.setProductProperty event`, async () => {
    render(<CreateProductModal />);

    act(() => {
      fireEvent.change(screen.getByLabelText('Название товара'), {
        target: { value: 'test' },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Цена за 1 ед. товара, руб" should call productsModel.setProductProperty event`, async () => {
    render(<CreateProductModal />);

    act(() => {
      fireEvent.change(screen.getByLabelText('Цена за 1 ед. товара, руб'), {
        target: { formattedValue: '123', value: '123', floatValue: 123 },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Штучный товар" should call productsModel.setProductProperty event`, async () => {
    render(<CreateProductModal />);

    act(() => {
      fireEvent.click(screen.getByLabelText('Штучный товар'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Нужен таймер товара" should call productsModel.setProductProperty event`, async () => {
    render(<CreateProductModal />);

    act(() => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);

    productsModel.setProductProperty({ key: 'needTimer', value: false });
  });

  test(`change field "Таймер для 1 ед. товара, мин" should call productsModel.setProductProperty event`, async () => {
    render(<CreateProductModal />);

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
      fireEvent.change(
        await waitFor(() =>
          screen.getByLabelText('Таймер для 1 ед. товара, мин')
        ),
        { target: { formattedValue: '321', value: '321', floatValue: 321 } }
      );
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(2);
  });
});
