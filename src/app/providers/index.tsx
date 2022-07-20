import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';

import { ThemeProvider } from './theme';
import { ScopeProvider } from './scope';
import { DndProvider } from './dnd';
import { RouterProvider } from './router';

export const Providers: FC<IChildrenOnly> = ({ children }) => (
  <ScopeProvider>
    <RouterProvider>
      <ThemeProvider>
        <DndProvider>{children}</DndProvider>
      </ThemeProvider>
    </RouterProvider>
  </ScopeProvider>
);
