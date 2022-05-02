import { allSettled, fork } from 'effector';

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
