import { render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { TablesType } from '@/shared';
import { ProductCard, ProductCardList } from '@/widgets/product-card';

import { initWrapper } from '../../__lib__/component-wrapper';
import { tables, table, tableProduct } from '../../__mocks__/fixtures';

test('should call decreaseTableProduct', async () => {
  const scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
  };

  render(<ProductCard tableId={table.id} tableProduct={testTableProduct} />, { wrapper: initWrapper(scope) });

  const element = screen.getByRole(`decrease-table-product-count-button-${table.id}-${testTableProduct.id}`);

  expect(element).toBeDefined();
});

test('should render empty product card list', () => {
  const scope = fork();

  const testTables = {
    ...tables,
    [table.id]: {
      ...tables[table.id],
      products: undefined,
    },
  } as TablesType;

  const result = render(<ProductCardList tableId={table.id} products={testTables?.[table.id]?.products} />, {
    wrapper: initWrapper(scope),
  });

  expect(result).toBeDefined();
});
