import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { TableProductTimerStatuses } from 'shared/api';
import { table, tableProduct } from 'tests/__mocks__/fixtures';
import { ProductCard } from './product-card';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('should call decreaseTableProduct', async () => {
  scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
  };
  const testTables = {
    [table.id]: {
      ...table,
      products: {
        [tableProduct.id]: testTableProduct,
      },
    },
  };

  render(
    <ProductCard
      tables={testTables}
      tableId={table.id}
      tableProduct={testTableProduct}
      timerStatus={TableProductTimerStatuses.PLAY}
    />,
    { wrapper: Wrapper }
  );

  const element = screen.getByRole('decrease-table-product-count-button');

  expect(element).toBeDefined();
});
