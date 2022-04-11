import React from 'react';

import { DashBoardGate } from './model';
import { TablesList } from 'widgets/table';
import { Header } from 'widgets/header';
import { CreateProductModal } from 'features/product';

interface IDashboardProps {
  className?: string;
}

export const Dashboard: React.FC<IDashboardProps> = ({ className }) => {
  return (
    <>
      <DashBoardGate />
      <div className={className}>
        <Header />
        <TablesList />
        <CreateProductModal />
      </div>
    </>
  );
};
