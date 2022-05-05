import { fireEvent, render, screen } from '@testing-library/react';
import { Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';
import { tableModel, TableUI } from '@/features/table';
import { table } from '../../../../__mocks__/fixtures';

let scope: Scope;

const Wrapper: FC<IChildrenOnly> = ({ children }) => (
  <Provider value={scope}>{children}</Provider>
);

test('should call setTitle', async () => {
  const fn = jest.fn();
  tableModel.setTitle.watch(fn);

  render(
    <TableUI.SetTitle.Field tableId={table.id} tableTitle={table.title} />,
    {
      wrapper: Wrapper,
    }
  );

  fireEvent.click(screen.getByRole(`editable-table-title-${table.id}-button`));
  fireEvent.click(screen.getByRole(`editable-table-title-${table.id}-button`));

  expect(fn).toHaveBeenCalledTimes(1);
});
