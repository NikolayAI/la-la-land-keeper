import { render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly, TableProductTimerStatuses } from '@/shared';
import { ProductCard } from '@/widgets/product-card';
import { table, tableProduct } from '../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should call decreaseTableProduct', async () => {
  scope = fork();
  const testTableProduct = {
    ...tableProduct,
    units: 2,
  };

  render(
    <ProductCard tableId={table.id} tableProduct={testTableProduct} timerStatus={TableProductTimerStatuses.play} />,
    { wrapper: Wrapper }
  );

  const element = screen.getByRole(`decrease-table-product-count-button-${table.id}-${testTableProduct.id}`);

  expect(element).toBeDefined();
});
