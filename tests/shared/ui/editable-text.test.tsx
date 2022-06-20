import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { EditableText } from '@/shared';

var mockSetEditableText = jest.fn(); // eslint-disable-line no-var

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockReturnValueOnce(['qe', mockSetEditableText]),
}));

jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());

const elementRole = 'test-editable-text';
const filedText = 'test-text';
const newText = '1';

const selectors = {
  btn: () => screen.getByRole(`editable-text-button-${elementRole}`),
  field: () => screen.getByRole(`editable-text-field-${elementRole}`),
};

test('should set new value', async () => {
  render(<EditableText role={elementRole} text={filedText} isLoading={false} setTableName={() => {}} />);

  act(() => {
    fireEvent.click(selectors.btn());
  });

  act(() => {
    fireEvent.change(selectors.field(), { target: { value: newText } });
  });

  expect(selectors.field().textContent).toBe(newText);
});
