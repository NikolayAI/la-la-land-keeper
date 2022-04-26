import { allSettled, fork } from 'effector';

import { ProductsAPI } from 'shared/api';
import { defaultProduct } from '../constants';
import {
  $product,
  createProductFx,
  removeProductFx,
  setProductProperty,
} from './model';

const params = {
  id: '1',
  title: 'test',
  price: 1,
  isPiece: false,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

const mockCreateProduct = jest.spyOn(ProductsAPI, 'createProduct');
const mockRemoveProduct = jest.spyOn(ProductsAPI, 'removeProduct');

test('createProductFx should calls ProductsAPI.createProduct', async () => {
  const scope = fork();

  await allSettled(createProductFx, { scope, params });

  expect(mockCreateProduct).toHaveBeenCalledTimes(1);
});

test('removeProductFx should calls ProductsAPI.removeProduct', async () => {
  const scope = fork();

  await allSettled(removeProductFx, { scope, params });

  expect(mockRemoveProduct).toHaveBeenCalledTimes(1);
});

test('setProductProperty should set data to $product', async () => {
  const scope = fork({
    values: [[$product, defaultProduct]],
  });

  await allSettled(setProductProperty, {
    scope,
    params: {
      key: 'title',
      value: 'test',
    },
  });

  expect(scope.getState($product)).toStrictEqual({
    id: '',
    title: 'test',
    price: 0,
    isPiece: true,
    needTimer: false,
    eachProductUnitMinutesTimer: 0,
  });
});
