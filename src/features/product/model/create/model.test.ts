import { allSettled, fork } from 'effector';

import { $isModalOpen, closeModal, openModal } from './model';

test('openCreateProductModal should set "true" to $isOpenCreateProductModal', async () => {
  const scope = fork({
    values: [[$isModalOpen, false]],
  });

  await allSettled(openModal, { scope });

  expect(scope.getState($isModalOpen)).toBe(true);
});

test(`closeCreateProductModal should set "false" to $isOpenCreateProductModal`, async () => {
  const scope = fork({
    values: [[$isModalOpen, true]],
  });

  await allSettled(closeModal, { scope });

  expect(scope.getState($isModalOpen)).toBe(false);
});
