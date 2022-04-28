import { fork, Scope } from 'effector';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { TableUI, tableModel } from 'features/table';
import { table, tables } from 'tests/__mocks__/fixtures';
import { TableProductUI } from 'features/table-product';
import { ProductCardList } from 'widgets/product-card';
import { Table } from './table';

let scope: Scope;

const Wrapper: FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const clearTableFn = jest.fn();
  tableModel.clear.watch(clearTableFn);

  const removeTableFn = jest.fn();
  tableModel.remove.watch(removeTableFn);

  const setTableTitleFn = jest.fn();
  tableModel.setTitle.watch(setTableTitleFn);

  test('should call removeTableFn', () => {
    scope = fork();

    render(
      <Table
        tableId={table.id}
        tables={tables}
        SetTableTitleSlot={
          <TableUI.SetTitle.Field tableId={table.id} tableTitle={table.title} />
        }
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={
          <TableProductUI.Add.IconBtn tableId={table.id} />
        }
        ProductCardListSlot={
          <ProductCardList tables={tables} tableId={table.id} />
        }
      />,
      {
        wrapper: Wrapper,
      }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`remove-table-${table.id}-button`));
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
          <TableUI.SetTitle.Field tableId={table.id} tableTitle={table.title} />
        }
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={
          <TableProductUI.Add.IconBtn tableId={table.id} />
        }
        ProductCardListSlot={
          <ProductCardList tables={tables} tableId={table.id} />
        }
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
});
