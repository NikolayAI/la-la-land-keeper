import React, { FC } from 'react';
import { ProductUI } from '@/features/product';
import { TablesList } from '@/widgets/table';

import { DashBoardGate } from './model';

export const TablesPage: FC = () => (
  <>
    <DashBoardGate />
    <div className="dashboard">
      <TablesList />
      <ProductUI.CreateModal />
    </div>
  </>
);
