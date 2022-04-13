import { allSettled, fork } from 'effector';

import {
  $isOpenCreateProductModal,
  closeCreateProductModal,
  openCreateProductModal,
} from './model';

test('openCreateProductModal should set "true" to $isOpenCreateProductModal', async () => {
  const scope = fork({
    values: [[$isOpenCreateProductModal, false]],
  });

  await allSettled(openCreateProductModal, { scope });

  expect(scope.getState($isOpenCreateProductModal)).toBe(true);
});

test(`closeCreateProductModal should set "false" to $isOpenCreateProductModal`, async () => {
  const scope = fork({
    values: [[$isOpenCreateProductModal, true]],
  });

  await allSettled(closeCreateProductModal, { scope });

  expect(scope.getState($isOpenCreateProductModal)).toBe(false);
});
