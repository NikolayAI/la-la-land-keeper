import { allSettled, fork } from 'effector';

import { tableModel } from '@/features/table';

import { table } from '../../../../__mocks__/fixtures';

test('should set "false" loading if remove table complete', async () => {
  const scope = fork({
    values: [[tableModel.$isRemoveLoading, { [table.id]: true }]],
  });

  await allSettled(tableModel.remove, {
    scope,
    params: {
      tableId: table.id,
    },
  });

  expect(scope.getState(tableModel.$isRemoveLoading)).toStrictEqual({ [table.id]: false });
});
