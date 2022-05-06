import { allSettled, fork } from 'effector';

import { defaultProduct } from '@/entities/products';
import { productModel } from '@/features/product';

test('openCreateProductModal should set "true" to $isOpenCreateProductModal', async () => {
  const scope = fork({
    values: [[productModel.$isModalOpen, false]],
  });

  await allSettled(productModel.openModal, { scope });

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
      key: 'title',
      value: 'test',
    },
  });

  expect(scope.getState(productModel.$product)).toStrictEqual({
    id: '',
    title: 'test',
    price: 0,
    isPiece: true,
    needTimer: false,
    eachProductUnitMinutesTimer: 0,
  });
});
