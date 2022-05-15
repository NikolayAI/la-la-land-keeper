import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { TablesUI } from '@/entities/tables';
import { TableUI, tableModel } from '@/features/table';
import { TableProductUI } from '@/features/table-product';
import { ProductCardList } from '@/widgets/product-card';
import { table, tables } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

describe('events', () => {
  const clearTableFn = jest.fn();
  tableModel.clear.watch(clearTableFn);

  const removeTableFn = jest.fn();
  tableModel.remove.watch(removeTableFn);

  const setTableNameFn = jest.fn();
  tableModel.setName.watch(setTableNameFn);

  test('should call removeTableFn', () => {
    scope = fork();

    render(
      <TablesUI.Table
        tableId={table.id}
        tables={tables}
        SetTableNameSlot={<TableUI.SetName.Field tableId={table.id} tableName={table.name} />}
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={<TableProductUI.Add.IconBtn tableId={table.id} />}
        ProductCardListSlot={<ProductCardList tables={tables} tableId={table.id} />}
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
      <TablesUI.Table
        tableId={table.id}
        tables={tables}
        SetTableNameSlot={<TableUI.SetName.Field tableId={table.id} tableName={table.name} />}
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={<TableProductUI.Add.IconBtn tableId={table.id} />}
        ProductCardListSlot={<ProductCardList tables={tables} tableId={table.id} />}
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
