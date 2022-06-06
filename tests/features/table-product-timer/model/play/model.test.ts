import { allSettled, fork } from 'effector';

import { TableProductTimerStatuses } from '@/shared';
import { tableProductTimerModel } from '@/features/table-product-timer';

import { table, tableProduct } from '../../../../__mocks__/fixtures';

test('should set "false" to loading if stop timer complete', async () => {
  const scope = fork({
    values: [
      [
        tableProductTimerModel.$isPlayLoading,
        {
          [table.id]: {
            [tableProduct.id]: true,
          },
        },
      ],
    ],
  });

  await allSettled(tableProductTimerModel.play, {
    scope,
    params: {
      tableId: table.id,
      productId: tableProduct.id,
      pausedAt: tableProduct.pausedAt,
      pausedTimerCount: tableProduct.pausedTimerCount,
      timerStatus: TableProductTimerStatuses.play,
    },
  });

  expect(scope.getState(tableProductTimerModel.$isPlayLoading)).toStrictEqual({
    [table.id]: {
      [tableProduct.id]: false,
    },
  });
});
