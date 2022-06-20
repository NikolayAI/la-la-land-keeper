import { act, fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { productsModel } from '@/entities/products';
import { tableProductModel, TableProductUI } from '@/features/table-product';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { products } from '../../../../__mocks__/fixtures';

describe('events', () => {
  const addProductToTableFn = jest.fn();
  tableProductModel.add.watch(addProductToTableFn);

  const setAnchorElFn = jest.fn();
  tableProductModel.setAddAnchorEl.watch(setAnchorElFn);

  const tableId = '1';

  test('should call addProductToTable and setAnchorElFn for add product', async () => {
    const scope = fork({
      values: [
        [productsModel.$products, products],
        [tableProductModel.$addAnchorEl, { [tableId]: <div /> }],
      ],
    });

    render(<TableProductUI.Add.Menu tableId={tableId} />, {
      wrapper: initWrapper(scope),
    });

    act(() => {
      fireEvent.click(screen.getByRole(`add-product-to-table-menu-item-${tableId}`));
    });

    expect(addProductToTableFn).toHaveBeenCalledTimes(1);
    expect(setAnchorElFn).toHaveBeenCalledTimes(1);
  });
});
