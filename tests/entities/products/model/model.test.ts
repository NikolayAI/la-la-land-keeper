import { allSettled, fork } from 'effector';

import { ProductsAPI } from '@/shared';
import { productsModel } from '@/entities/products';

import { tableProduct } from '../../../__mocks__/fixtures';

const mockCreateProduct = jest.spyOn(ProductsAPI, 'createProduct');
const mockRemoveProduct = jest.spyOn(ProductsAPI, 'removeProduct');

test('createProductFx should calls ProductsAPI.createProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.createProductFx, { scope, params: tableProduct });

  expect(mockCreateProduct).toHaveBeenCalledTimes(1);
});

test('removeProductFx should calls ProductsAPI.removeProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.removeProductFx, { scope, params: { productId: tableProduct.id } });

  expect(mockRemoveProduct).toHaveBeenCalledTimes(1);
});
