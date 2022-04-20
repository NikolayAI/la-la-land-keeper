import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import {
  products,
  table,
  tableProduct,
  tables,
} from 'tests/__mocks__/fixtures';
import { productsModel } from 'entities/products';
import { tablesModel } from 'entities/tables';
import { Table, TablesList } from './ui';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('should render Table widget', () => {
  scope = fork();

  render(<Table tableId={table.id} tables={tables} />, {
    wrapper: Wrapper,
  });

  const element = screen.getByText(tables['test-table-id'].title);

  expect(element).toBeDefined();
});

test('should render Table from TablesList', () => {
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
  scope = fork({
    values: [
      [tablesModel.$tables, testTables],
      [productsModel.$products, products],
    ],
  });

  render(<TablesList />, { wrapper: Wrapper });

  const element = screen.getByText(tables['test-table-id'].title);

  expect(element).toBeDefined();
});
