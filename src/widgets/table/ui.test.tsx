import React from 'react';
import { fork, Scope } from 'effector';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'effector-react/scope';

import { Table, TablesList } from './ui';
import { clearTable, deleteTable, setTableTitle } from 'features/table';
import { tablesModel } from 'entities/tables';
import { products, table, tables } from 'tests/__mocks__/fixtures';
import { productsModel } from 'entities/products';

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
    scope = fork({
      values: [[tablesModel.$tables, tables]],
    });

    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole(`delete-table-${table.id}-button`));
    });

    expect(deleteTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call clearTableFn', () => {
    scope = fork({
      values: [[tablesModel.$tables, tables]],
    });

    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole(`clear-table-${table.id}-button`));
    });

    expect(clearTableFn).toHaveBeenCalledTimes(1);
  });

  test('should render Table from TablesList', () => {
    scope = fork({
      values: [
        [tablesModel.$tables, tables],
        [productsModel.$products, products],
      ],
    });

    render(<TablesList />, { wrapper: Wrapper });

    const element = screen.getByText(tables['test-table-id'].title);

    expect(element).toBeDefined();
  });
});
