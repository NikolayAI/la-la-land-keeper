import { fireEvent, render, screen } from '@testing-library/react';
import { fork, Scope } from 'effector';
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
  scope = fork();

  render(<TableUI.SetName.Field tableId={table.id} tableName={table.name} />, {
    wrapper: Wrapper,
  });

  fireEvent.click(screen.getByRole(`editable-text-button-editable-table-name-${table.id}`));
  fireEvent.click(screen.getByRole(`editable-text-button-editable-table-name-${table.id}`));

  expect(fn).toHaveBeenCalledTimes(1);
});
