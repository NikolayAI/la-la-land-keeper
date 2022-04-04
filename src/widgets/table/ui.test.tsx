import React from 'react';
import { fork, Scope } from 'effector';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'effector-react/scope';

import { Table, TablesList } from './ui';
import { clearTable, deleteTable, setTableTitle } from 'features/table';
import { tablesModel } from 'entities/tables';
import { products, table, tables } from '../../../tests/__mocks__/fixtures';

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

  beforeEach(() => {
    scope = fork({
      values: [[tablesModel.$tables, tables]],
    });
  });

  test('should call deleteTableFn', async () => {
    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByRole(`delete-table-${table.id}-button`));

    expect(deleteTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call deleteTableFn', async () => {
    render(<Table tableId={table.id} tables={tables} products={products} />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByRole(`clear-table-${table.id}-button`));

    expect(clearTableFn).toHaveBeenCalledTimes(1);
  });

  test('should render Table from TablesList', async () => {
    render(<TablesList />, { wrapper: Wrapper });

    const element = screen.getByText(table.title);

    expect(element).toBeDefined();
  });
});
