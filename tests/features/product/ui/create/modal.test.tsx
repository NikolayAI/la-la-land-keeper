import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { fork, Scope } from 'effector';
import React from 'react';

import { productModel, ProductUI } from '@/features/product';

import { initWrapper } from '../../../../__lib__/component-wrapper';

let scope: Scope;

describe('events', () => {
  const createProductFn = jest.fn();
  productModel.create.watch(createProductFn);

  const setProductPropertyFn = jest.fn();
  productModel.setProperty.watch(setProductPropertyFn);

  beforeEach(() => {
    scope = fork();
    productModel.openCreateForm();
  });

  test('should call createProduct handler', async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByText('Создать'));
    });

    expect(createProductFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Название товара" should call productsModel.setProductProperty event`, async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.change(screen.getByLabelText('Название товара'), {
        target: { value: 'test' },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Цена за 1 ед. товара, руб" should call productsModel.setProductProperty event`, async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.change(screen.getByLabelText('Цена за 1 ед. товара, руб'), {
        target: { formattedValue: '123', value: '123', floatValue: 123 },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Штучный товар" should call productsModel.setProductProperty event`, async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByLabelText('Штучный товар'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Нужен таймер товара" should call productsModel.setProductProperty event`, async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Таймер для 1 ед. товара, мин" should call productsModel.setProductProperty event`, async () => {
    render(<ProductUI.CreateModal />, { wrapper: initWrapper(scope) });

    act(() => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
    });
    const element = await waitFor(() => screen.getByLabelText('Таймер для 1 ед. товара, мин'));
    act(() => {
      fireEvent.change(element, {
        target: { formattedValue: '321', value: '321', floatValue: 321 },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(2);
  });
});
