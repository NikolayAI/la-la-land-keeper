import { ITable } from '@/shared';
import { calculateTableTotalPrice } from '@/entities/tables';

import { table } from '../../../__mocks__/fixtures';

describe('calculateTableTotalPrice should return value', () => {
  test('1', async () => {
    const result = calculateTableTotalPrice(table);

    expect(result).toBe(1);
  });

  test('2', async () => {
    const result = calculateTableTotalPrice({} as ITable);

    expect(result).toBe(0);
  });
});
