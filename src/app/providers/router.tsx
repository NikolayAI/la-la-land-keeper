import { createHistoryRouter } from 'atomic-router';
import { RouterProvider as AtomicRouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';

import { routes } from '../../shared/configs/routes';

const router = createHistoryRouter({ routes });
const history = createBrowserHistory();
router.setHistory(history);

export const RouterProvider: FC<IChildrenOnly> = ({ children }) => (
  <AtomicRouterProvider router={router}>{children}</AtomicRouterProvider>
);
