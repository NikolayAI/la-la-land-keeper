import { allSettled, fork } from 'effector';

import { defaultProduct } from '@/entities/products';
import { productModel } from '@/features/product';

test('openCreateProductModal should set "true" to $isOpenCreateProductModal', async () => {
  const scope = fork({
    values: [[productModel.$isModalOpen, false]],
  });

  await allSettled(productModel.openCreateForm, { scope });

  expect(scope.getState(productModel.$isModalOpen)).toBe(true);
});

test(`closeCreateProductModal should set "false" to $isOpenCreateProductModal`, async () => {
  const scope = fork({
    values: [[productModel.$isModalOpen, true]],
  });

  await allSettled(productModel.closeModal, { scope });

  expect(scope.getState(productModel.$isModalOpen)).toBe(false);
});

test('setProductProperty should set data to $product', async () => {
  const scope = fork({
    values: [[productModel.$product, defaultProduct]],
  });

  await allSettled(productModel.setProperty, {
    scope,
    params: {
      key: 'name',
      value: 'test',
    },
  });

  expect(scope.getState(productModel.$product)).toStrictEqual({
    id: '',
    name: 'test',
    price: 0,
    isPiece: true,
    needTimer: false,
    eachProductUnitMinutesTimer: 0,
  });
});
