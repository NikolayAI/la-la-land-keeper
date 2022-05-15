import { allSettled, fork } from 'effector';

import { ProductsAPI } from '@/shared';
import { productsModel } from '@/entities/products';

const params = {
  id: '1',
  name: 'test',
  price: 1,
  isPiece: false,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

const mockCreateProduct = jest.spyOn(ProductsAPI, 'createProduct');
const mockRemoveProduct = jest.spyOn(ProductsAPI, 'removeProduct');

test('createProductFx should calls ProductsAPI.createProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.createProductFx, { scope, params });

  expect(mockCreateProduct).toHaveBeenCalledTimes(1);
});

test('removeProductFx should calls ProductsAPI.removeProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.removeProductFx, { scope, params });

  expect(mockRemoveProduct).toHaveBeenCalledTimes(1);
});
