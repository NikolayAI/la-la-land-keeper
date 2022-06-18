import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { EditableText } from '@/shared';

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());
});
const setEditableText = jest.fn();
jest.spyOn(React, 'useState').mockImplementation(() => ['', setEditableText]);

const elementRole = 'test-editable-text';
const filedText = 'test-text';

test('should call setState', async () => {
  render(<EditableText role={elementRole} text={filedText} isLoading={false} setTableName={() => {}} />);

  act(() => {
    fireEvent.click(screen.getByRole(`editable-text-button-${elementRole}`));
  });

  await act(() => {
    waitFor(() => {
      fireEvent.change(screen.getByRole(`editable-text-field-${elementRole}`), {
        target: { value: '1' },
      });
    });
  });

  expect(setEditableText).toHaveBeenCalled();
});
