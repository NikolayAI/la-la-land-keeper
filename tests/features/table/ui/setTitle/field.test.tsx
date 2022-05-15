import { fireEvent, render, screen } from '@testing-library/react';
import { Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { tableModel, TableUI } from '@/features/table';
import { table } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;

test('should call setName', async () => {
  const fn = jest.fn();
  tableModel.setName.watch(fn);

  render(<TableUI.SetName.Field tableId={table.id} tableName={table.name} />, {
    wrapper: Wrapper,
  });

  fireEvent.click(screen.getByRole(`editable-table-name-${table.id}-button`));
  fireEvent.click(screen.getByRole(`editable-table-name-${table.id}-button`));

  expect(fn).toHaveBeenCalledTimes(1);
});
