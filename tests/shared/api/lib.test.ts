import { createTableBody, createTableProductBody, TableProductTimerStatuses } from '@/shared';

describe('should return specific value', () => {
  test('call createTableBody', async () => {
    const result = createTableBody({ id: '1' });

    expect(result).toStrictEqual({
      id: '1',
      name: 'неизвестный стол',
      products: {},
    });
  });

  test('call createTableProductBody', async () => {
    const product = {
      id: '1',
      name: 'test',
      price: 10,
      isPiece: true,
      needTimer: true,
      eachProductUnitMinutesTimer: 0,
    };

    const result = createTableProductBody(product);

    expect(result).toStrictEqual({
      ...product,
      units: 1,
      createdAt: result.createdAt,
      timerStatus: TableProductTimerStatuses.play,
      pausedAt: null,
      pausedTimerCount: 0,
    });
  });
});
