import { fork } from 'effector';
import { Provider } from 'effector-react/ssr';
import React, { FC } from 'react';

import { IChildrenOnly } from '@/shared';

const scope = fork();

export const ScopeProvider: FC<IChildrenOnly> = ({ children }) => <Provider value={scope}>{children}</Provider>;
