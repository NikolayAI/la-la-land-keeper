import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { EditableText } from '@/shared';

const mockSetEditableText = jest.fn();

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());
  jest.spyOn(React, 'useState').mockImplementation(() => ['', mockSetEditableText]);
});

afterEach(() => {
  jest.clearAllMocks();
});

const elementRole = 'test-editable-text';
const filedText = 'test-text';
const newText = '1';

const selectors = {
  btn: () => screen.getByRole(`editable-text-button-${elementRole}`),
  field: () => screen.getByRole(`editable-text-field-${elementRole}`),
};

test('should set new value', () => {
  render(<EditableText role={elementRole} text={filedText} isLoading={false} setTableName={() => {}} />);

  act(() => {
    fireEvent.click(selectors.btn());
  });

  act(() => {
    fireEvent.change(selectors.field(), { target: { value: newText } });
  });

  expect(selectors.field().textContent).toBe(newText);
});
