import { fireEvent, render, screen } from '@testing-library/react';
import { fork } from 'effector';
import React from 'react';

import { tableModel, TableUI } from '@/features/table';

import { initWrapper } from '../../../../__lib__/component-wrapper';
import { table } from '../../../../__mocks__/fixtures';

test('should call setName', async () => {
  const fn = jest.fn();
  tableModel.setName.watch(fn);
  const scope = fork();

  render(<TableUI.SetNameField tableId={table.id} tableName={table.name} />, {
    wrapper: initWrapper(scope),
  });

  fireEvent.click(screen.getByRole(`editable-text-button-editable-table-name-${table.id}`));
  fireEvent.click(screen.getByRole(`editable-text-button-editable-table-name-${table.id}`));

  expect(fn).toHaveBeenCalledTimes(1);
});
