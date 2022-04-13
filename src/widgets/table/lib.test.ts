import { table } from 'tests/__mocks__/fixtures';
import { calculateTableTotalPrice } from './lib';

test('calculateTableTotalPrice should return value', async () => {
  const result = calculateTableTotalPrice(table);

  expect(result).toBe(1);
});
