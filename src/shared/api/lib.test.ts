import { TableProductTimerStatuses } from './constants';
import { createTableBody, createTableProductBody } from './lib';

describe('should return specific value', () => {
  test('call createTableBody', async () => {
    const result = createTableBody({ id: '1' });

    expect(result).toStrictEqual({
      id: '1',
      title: 'неизвестный стол',
      products: {},
    });
  });

  test('call createTableProductBody', async () => {
    const product = {
      id: '1',
      title: 'test',
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
      timerStatus: TableProductTimerStatuses.PLAY,
    });
  });
});
