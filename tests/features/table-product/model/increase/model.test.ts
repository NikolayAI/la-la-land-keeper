import { allSettled, fork } from 'effector';

import { tablesModel } from '@/entities/tables';
import { tableProductModel } from '@/features/table-product';

import { table, tableProduct, tables } from '../../../../__mocks__/fixtures';

test('when increase called increaseProductFx should call with valid params', async () => {
  const fn = jest.fn();
  tablesModel.increaseProductFx.watch(fn);
  const scope = fork({
    values: [[tablesModel.$tables, tables]],
  });

  await allSettled(tableProductModel.increase, {
    scope,
    params: {
      tableId: table.id,
      productId: tableProduct.id,
    },
  });

  expect(fn).toHaveBeenCalledWith({
    tableId: table.id,
    productId: tableProduct.id,
    value: tables[table.id]?.products[tableProduct.id]?.units + 1,
  });
});
