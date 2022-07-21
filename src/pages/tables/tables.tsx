import React, { FC } from 'react';

import { TableUI } from '@/features/table';
import { TablesList } from '@/widgets/table';

export const TablesPage: FC = () => (
  <div className="dashboard">
    <TableUI.CreateBtn />
    <TablesList />
  </div>
);
