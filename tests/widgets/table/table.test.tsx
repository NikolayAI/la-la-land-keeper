import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';
import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { tableProductModel } from '@/features/table-product';
import { Table, TablesList } from '@/widgets/table';

import { initWrapper } from '../../__lib__/component-wrapper';
import { products, table, tableProduct, tables } from '../../__mocks__/fixtures';

const setAnchorElFn = jest.fn();
tableProductModel.setAddAnchorEl.watch(setAnchorElFn);

test('should render Table widget', () => {
  const scope = fork();

  render(<Table table={table} index={1} />, {
    wrapper: initWrapper(scope),
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
  const scope = fork({
    values: [
      [tablesModel.$tables, testTables],
      [productsModel.$products, products],
    ],
  });

  render(<TablesList />, { wrapper: initWrapper(scope) });

  const element = screen.getByText(tables['test-table-id'].name);

  expect(element).toBeDefined();
});

test('should call setAnchorElFn for open form', async () => {
  const scope = fork();

  render(<Table table={table} index={1} />, {
    wrapper: initWrapper(scope),
  });

  act(() => {
    fireEvent.click(screen.getByRole(`add-product-to-table-button-${table.id}`));
  });

  expect(setAnchorElFn).toHaveBeenCalledTimes(1);
});
