import { allSettled, fork } from 'effector';

import { tableProductModel } from '@/features/table-product';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should set "false" loading if add product complete', async () => {
  const scope = fork({
    values: [[tableProductModel.$isAddLoading, { [table.id]: true }]],
  });

  await allSettled(tableProductModel.add, {
    scope,
    params: {
      tableId: table.id,
      productId: tableProduct.id,
    },
  });

  expect(scope.getState(tableProductModel.$isAddLoading)).toStrictEqual({ [table.id]: false });
});
