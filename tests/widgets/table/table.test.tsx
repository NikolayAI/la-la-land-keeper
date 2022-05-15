import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { Table, TablesList } from '@/widgets/table';
import { products, table, tableProduct, tables } from '../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should render Table widget', () => {
  scope = fork();

  render(<Table tableId={table.id} tables={tables} />, {
    wrapper: Wrapper,
  });

  const element = screen.getByText(tables['test-table-id'].name);

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

  const element = screen.getByText(tables['test-table-id'].name);

  expect(element).toBeDefined();
});
