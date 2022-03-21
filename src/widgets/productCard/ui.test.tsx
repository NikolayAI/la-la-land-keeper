import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/scope';

import { ProductCard } from './ui';
import {
  decreaseTableProduct,
  deleteProductFromTable,
  increaseTableProduct
} from '../../features/tableProduct';
import { tablesModel } from '../../entities/tables';
import { TableProductTimerStatuses } from '../../shared/api';
import {
  table,
  tableProduct,
  tables
} from '../../../tests/__mocks__/handlers/fixtures';

let scope: Scope;

const Wrapper: React.FC = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

describe('events', () => {
  const decreaseTableProductFn = jest.fn();
  decreaseTableProduct.watch(decreaseTableProductFn);

  const deleteProductFromTableFn = jest.fn();
  deleteProductFromTable.watch(deleteProductFromTableFn);

  const increaseTableProductFn = jest.fn();
  increaseTableProduct.watch(increaseTableProductFn);

  test('should call decreaseTableProduct', async () => {
    const testTableProduct = {
      ...tableProduct,
      units: 2,
    };
    const testTables = {
      [table.id]: {
        ...table,
        products: {
          [tableProduct.id]: testTableProduct
        }
      }
    };
    scope = fork({
      values: [[tablesModel.$tables, testTables]]
    });

    render(
      <ProductCard
        tables={testTables}
        tableId={table.id}
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByRole('decrease-table-product-count-button'));

    expect(decreaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('should call deleteProductFromTable', async () => {
    scope = fork({
      values: [[tablesModel.$tables, tables]]
    });

    render(
      <ProductCard
        tables={tables}
        tableId={table.id}
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByRole('decrease-table-product-count-button'));

    expect(deleteProductFromTableFn).toHaveBeenCalledTimes(1);
  });

  test('should call deleteProductFromTable', async () => {
    scope = fork({
      values: [[tablesModel.$tables, tables]]
    });

    render(
      <ProductCard
        tables={tables}
        tableId={table.id}
        tableProduct={tableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByRole('increase-table-product-count-button'));

    expect(increaseTableProductFn).toHaveBeenCalledTimes(1);
  });

  test('should call deleteProductFromTable', async () => {
    const testTableProduct = {
      ...tableProduct,
      isPiece: false,
    };
    const testTables = {
      [table.id]: {
        ...table,
        products: {
          [tableProduct.id]: testTableProduct
        }
      }
    };
    scope = fork({
      values: [[tablesModel.$tables, testTables]]
    });

    render(
      <ProductCard
        tables={testTables}
        tableId={table.id}
        tableProduct={testTableProduct}
        timerStatus={TableProductTimerStatuses.PLAY}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByRole('delete-table-product-button'));

    expect(deleteProductFromTableFn).toHaveBeenCalledTimes(1);
  });
});