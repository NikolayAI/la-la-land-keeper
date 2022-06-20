import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { TablesUI } from '@/entities/tables';
import { tableModel, TableUI } from '@/features/table';
import { TableProductUI } from '@/features/table-product';
import { ProductCardList } from '@/widgets/product-card';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table, tables } from '../../../../__mocks__/fixtures';

describe('events', () => {
  const clearTableFn = jest.fn();
  tableModel.clear.watch(clearTableFn);

  const removeTableFn = jest.fn();
  tableModel.remove.watch(removeTableFn);

  const setTableNameFn = jest.fn();
  tableModel.setName.watch(setTableNameFn);

  test('should call removeTableFn', () => {
    const scope = fork();

    render(
      <TablesUI.Table
        tableId={table.id}
        tables={tables}
        SetTableNameSlot={<TableUI.SetName.Field tableId={table.id} tableName={table.name} />}
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={<TableProductUI.Add.Menu tableId={table.id} />}
        ProductCardListSlot={<ProductCardList tables={tables} tableId={table.id} />}
      />,
      {
        wrapper: initWrapper(scope),
      }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`remove-table-button-${table.id}`));
    });

    expect(removeTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call clearTableFn', () => {
    const scope = fork();

    render(
      <TablesUI.Table
        tableId={table.id}
        tables={tables}
        SetTableNameSlot={<TableUI.SetName.Field tableId={table.id} tableName={table.name} />}
        ClearTableSlot={<TableUI.Clear.Btn tableId={table.id} />}
        RemoveTableSlot={<TableUI.Remove.Btn tableId={table.id} />}
        AddProductToTableSlot={<TableProductUI.Add.Menu tableId={table.id} />}
        ProductCardListSlot={<ProductCardList tables={tables} tableId={table.id} />}
      />,
      {
        wrapper: initWrapper(scope),
      }
    );

    act(() => {
      fireEvent.click(screen.getByRole(`clear-table-button-${table.id}`));
    });

    expect(clearTableFn).toHaveBeenCalledTimes(1);
  });
});
