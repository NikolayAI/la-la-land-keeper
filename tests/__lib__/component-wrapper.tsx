import { Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { DndProvider } from '@/app';

import { IChildrenOnly } from '@/shared';

export const initWrapper = (scope: Scope) => {
  const Wrapper: FC<IChildrenOnly> = ({ children }) => (
    <DndProvider>
      <Provider value={scope}>{children}</Provider>
    </DndProvider>
  );
  return Wrapper;
};
