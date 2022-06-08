import { allSettled, fork } from 'effector';

import { tableProductModel } from '@/features/table-product';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should set "false" loading if remove product complete', async () => {
  const scope = fork({
    values: [[tableProductModel.$isRemoveLoading, { [table.id]: { [tableProduct.id]: true } }]],
  });

  await allSettled(tableProductModel.remove, {
    scope,
    params: { tableId: table.id, productId: tableProduct.id },
  });

  expect(scope.getState(tableProductModel.$isRemoveLoading)).toStrictEqual({
    [table.id]: { [tableProduct.id]: false },
  });
});
