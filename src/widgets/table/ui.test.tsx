import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import { productsModel } from 'entities/products';
import { tablesModel } from 'entities/tables';
import {
  removeTableModel,
  RemoveTableUI,
  clearTableModel,
  ClearTableUI,
  setTableTitleModel,
  SetTableTitleUI,
} from 'features/table';
import {
  products,
  table,
  tableProduct,
  tables,
} from 'tests/__mocks__/fixtures';
import { Table, TablesList } from './ui';
import { AddTableProductUI } from 'features/tableProduct';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const clearTableFn = jest.fn();
  clearTableModel.clear.watch(clearTableFn);

  const removeTableFn = jest.fn();
  removeTableModel.remove.watch(removeTableFn);

  const setTableTitleFn = jest.fn();
  setTableTitleModel.setTitle.watch(setTableTitleFn);

  test('should call removeTableFn', () => {
    scope = fork();

    render(
      <Table
        tableId={table.id}
        tables={tables}
        SetTableTitleSlot={
          <SetTableTitleUI.Field tableId={table.id} tableTitle={table.title} />
        }
        ClearTableSlot={<ClearTableUI.Btn tableId={table.id} />}
        RemoveTableSlot={<RemoveTableUI.Btn tableId={table.id} />}
        AddProductToTableSlot={<AddTableProductUI.IconBtn tableId={table.id} />}
      />,
      {
        wrapper: Wrapper,
      }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`delete-table-${table.id}-button`));
    });

    expect(removeTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call clearTableFn', () => {
    scope = fork();

    render(
      <Table
        tableId={table.id}
        tables={tables}
        SetTableTitleSlot={
          <SetTableTitleUI.Field tableId={table.id} tableTitle={table.title} />
        }
        ClearTableSlot={<ClearTableUI.Btn tableId={table.id} />}
        RemoveTableSlot={<RemoveTableUI.Btn tableId={table.id} />}
        AddProductToTableSlot={<AddTableProductUI.IconBtn tableId={table.id} />}
      />,
      {
        wrapper: Wrapper,
      }
    );

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
