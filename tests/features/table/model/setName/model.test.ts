import { allSettled, fork } from 'effector';

import { tableModel } from '@/features/table';

import { table } from '../../../../__mocks__/fixtures';

test('should set "false" loading if set table name complete', async () => {
  const scope = fork({
    values: [[tableModel.$isSetNameLoading, { [table.id]: true }]],
  });

  await allSettled(tableModel.setName, {
    scope,
    params: {
      tableId: table.id,
      text: table.name,
    },
  });

  expect(scope.getState(tableModel.$isSetNameLoading)).toStrictEqual({ [table.id]: false });
});
