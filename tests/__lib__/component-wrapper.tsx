import { Scope } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';

export const initWrapper = (scope: Scope) => {
  const Wrapper: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;
  return Wrapper;
};
