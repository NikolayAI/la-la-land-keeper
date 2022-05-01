import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productsModel } from '@/entities/products';
import { create, openModal } from '../../model/create/model';
import { Modal } from './modal';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const createProductFn = jest.fn();
  create.watch(createProductFn);

  const setProductPropertyFn = jest.fn();
  productsModel.setProductProperty.watch(setProductPropertyFn);

  beforeEach(() => {
    scope = fork();
    openModal();
  });

  test('should call createProduct handler', async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByText('Создать'));
    });

    expect(createProductFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Название товара" should call productsModel.setProductProperty event`, async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.change(screen.getByLabelText('Название товара'), {
        target: { value: 'test' },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Цена за 1 ед. товара, руб" should call productsModel.setProductProperty event`, async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.change(screen.getByLabelText('Цена за 1 ед. товара, руб'), {
        target: { formattedValue: '123', value: '123', floatValue: 123 },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Штучный товар" should call productsModel.setProductProperty event`, async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByLabelText('Штучный товар'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Нужен таймер товара" should call productsModel.setProductProperty event`, async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(1);
  });

  test(`change field "Таймер для 1 ед. товара, мин" should call productsModel.setProductProperty event`, async () => {
    render(<Modal />, { wrapper: Wrapper });

    act(() => {
      fireEvent.click(screen.getByLabelText('Нужен таймер товара'));
    });
    const element = await waitFor(() =>
      screen.getByLabelText('Таймер для 1 ед. товара, мин')
    );
    act(() => {
      fireEvent.change(element, {
        target: { formattedValue: '321', value: '321', floatValue: 321 },
      });
    });

    expect(setProductPropertyFn).toHaveBeenCalledTimes(2);
  });
});
