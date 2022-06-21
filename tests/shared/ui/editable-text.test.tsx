import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { EditableText } from '@/shared';

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementationOnce((cb) => cb());
});

const elementRole = 'test-editable-text';
const fieldText = 'test-text';
const newText = '1';

const selectors = {
  btn: () => screen.getByRole(`editable-text-button-${elementRole}`),
  field: () => screen.getByRole(`editable-text-field-${elementRole}`),
  text: () => screen.getByRole(`editable-text-value-${elementRole}`),
};

test('should set new value', async () => {
  render(<EditableText role={elementRole} text={fieldText} isLoading={false} setTableName={() => {}} />);

  act(() => {
    userEvent.click(selectors.btn());
  });

  await waitFor(() => {
    act(() => {
      userEvent.type(selectors.field(), newText);
    });
  });

  await waitFor(() => {
    expect(selectors.field()).toHaveValue(`${fieldText}${newText}`);
  });
});

test('should quit edit mode if Enter pressed when typing', async () => {
  render(<EditableText role={elementRole} text={fieldText} isLoading={false} setTableName={() => {}} />);

  act(() => {
    userEvent.click(selectors.btn());
  });

  await waitFor(() => {
    expect(selectors.field()).toBeDefined();
    act(() => {
      userEvent.keyboard('{Enter}');
    });
  });

  expect(selectors.text()).toBeDefined();
});

test('should change opacity during loading', () => {
  render(<EditableText role={elementRole} text={fieldText} isLoading={true} setTableName={() => {}} />);

  expect(selectors.text()).toHaveStyle('opacity: 0.5');
});
