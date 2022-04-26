import React, { FC } from 'react';

import { ProductUI } from 'features/product';
import { Header } from 'widgets/header';
import { TablesList } from 'widgets/table';
import { DashBoardGate } from './model';

interface IDashboardProps {
  className?: string;
}

export const Dashboard: FC<IDashboardProps> = ({ className }) => (
  <>
    <DashBoardGate />
    <div className={className}>
      <Header />
      <TablesList />
      <ProductUI.Create.Modal />
    </div>
  </>
);
