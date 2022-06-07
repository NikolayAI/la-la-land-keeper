import { allSettled, fork } from 'effector';

import { tableProductModel } from '@/features/table-product';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should set "false" loading if decrease product complete', async () => {
  const scope = fork({
    values: [
      [
        tableProductModel.$isDecreaseLoading,
        {
          [table.id]: {
            [tableProduct.id]: true,
          },
        },
      ],
    ],
  });

  await allSettled(tableProductModel.decrease, {
    scope,
    params: {
      tableId: table.id,
      productId: tableProduct.id,
    },
  });

  expect(scope.getState(tableProductModel.$isDecreaseLoading)).toStrictEqual({
    [table.id]: {
      [tableProduct.id]: false,
    },
  });
});
