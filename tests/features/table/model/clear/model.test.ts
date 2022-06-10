import { allSettled, fork } from 'effector';

import { tableModel } from '@/features/table';

import { table } from '../../../../__mocks__/fixtures';

test('should set "false" loading if clear table complete', async () => {
  const scope = fork({
    values: [[tableModel.$isClearLoading, { [table.id]: true }]],
  });

  await allSettled(tableModel.clear, {
    scope,
    params: {
      tableId: table.id,
    },
  });

  expect(scope.getState(tableModel.$isClearLoading)).toStrictEqual({ [table.id]: false });
});
