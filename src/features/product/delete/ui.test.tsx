import React from 'react';import { fireEvent, render, screen } from '@testing-library/react';import { DeleteProduct } from './ui';import { openDeleteProductForm } from './model';const products = {  1: {    id: '1',    title: 'test',    price: 12,    isPiece: true,    needTimer: true,    eachProductUnitMinutesTimer: 1  },};test('should call openDeleteProductForm', async () => {  const openDeleteProductFormFn = jest.fn();  openDeleteProductForm.watch(openDeleteProductFormFn);  render(<DeleteProduct products={products} />);  fireEvent.click(screen.getByText('Удалить товар'));  expect(openDeleteProductFormFn).toHaveBeenCalledTimes(1);  openDeleteProductFormFn.mockReset();});