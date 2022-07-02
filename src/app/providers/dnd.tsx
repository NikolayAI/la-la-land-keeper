import React, { FC } from 'react';
import { DndProvider as Provider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { IChildrenOnly } from '@/shared';

export const DndProvider: FC<IChildrenOnly> = ({ children }) => <Provider backend={HTML5Backend}>{children}</Provider>;
