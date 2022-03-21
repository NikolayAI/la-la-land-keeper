import { allSettled, fork } from 'effector';

import { productsModel } from '.';
import { defaultProduct } from './constants';
import {ProductsAPI} from '../../shared/api';

const params = {
  id: '1',
  title: 'test',
  price: 1,
  isPiece: false,
  needTimer: false,
  eachProductUnitMinutesTimer: 0,
};

const mockCreateProduct = jest.spyOn(ProductsAPI, 'createProduct', );
const mockDeleteProduct = jest.spyOn(ProductsAPI, 'deleteProduct', );

test('createProductFx should calls ProductsAPI.createProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.createProductFx, { scope, params });

  expect(mockCreateProduct).toHaveBeenCalledTimes(1);
});

test('deleteProductFx should calls ProductsAPI.deleteProduct', async () => {
  const scope = fork();

  await allSettled(productsModel.deleteProductFx, { scope, params });

  expect(mockDeleteProduct).toHaveBeenCalledTimes(1);
});

test('setProductProperty should set data to $product', async () => {
  const scope = fork({
    values: [[productsModel.$product, defaultProduct]]
  });

  await allSettled(productsModel.setProductProperty, {
    scope,
    params: {
      key: 'title',
      value: 'test',
    }
  });

  expect(scope.getState(productsModel.$product)).toStrictEqual({
    id: '',
    title: 'test',
    price: 0,
    isPiece: true,
    needTimer: false,
    eachProductUnitMinutesTimer: 0,
  });
});