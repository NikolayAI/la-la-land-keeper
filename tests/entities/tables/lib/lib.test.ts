import { calculateTableTotalPrice } from '@/entities/tables';

import { table } from '../../../__mocks__/fixtures';

test('calculateTableTotalPrice should return value', async () => {
  const result = calculateTableTotalPrice(table);

  expect(result).toBe(1);
});
