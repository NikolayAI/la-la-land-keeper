import { fork, Scope } from 'effector';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import {
  clearTableModel,
  ClearTableUI,
  removeTableModel,
  RemoveTableUI,
  setTableTitleModel,
  SetTableTitleUI,
} from 'features/table';
import { table, tables } from 'tests/__mocks__/fixtures';
import { AddTableProductUI } from 'features/tableProduct';
import { ProductCardList } from 'widgets/productCard';
import { Table } from './index';

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
        ProductCardListSlot={
          <ProductCardList tables={tables} tableId={table.id} />
        }
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
