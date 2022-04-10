import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';

import { Table, TablesList } from './ui';
import { clearTable, deleteTable, setTableTitle } from 'features/table';
import { tablesModel } from 'entities/tables';
import { productsModel } from 'entities/products';
import {
  products,
  table,
  tableProduct,
  tables,
} from 'tests/__mocks__/fixtures';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const clearTableFn = jest.fn();
  clearTable.watch(clearTableFn);

  const deleteTableFn = jest.fn();
  deleteTable.watch(deleteTableFn);

  const setTableTitleFn = jest.fn();
  setTableTitle.watch(setTableTitleFn);

  test('should call deleteTableFn', () => {
    scope = fork();

    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole(`delete-table-${table.id}-button`));
    });

    expect(deleteTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call clearTableFn', () => {
    scope = fork();

    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole(`clear-table-${table.id}-button`));
    });

    expect(clearTableFn).toHaveBeenCalledTimes(1);
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
});
