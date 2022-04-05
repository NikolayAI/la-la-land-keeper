import { calculateTableTotalPrice } from './lib';
import { table } from 'tests/__mocks__/fixtures';

test('calculateTableTotalPrice should return value', async () => {
  const result = calculateTableTotalPrice(table);

  expect(result).toBe(1);
});
