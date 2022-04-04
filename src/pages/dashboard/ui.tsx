import React from 'react';

import { DashBoardGate } from './model';
import { TablesList } from 'widgets/table';
import { Header } from 'widgets/header';
import { CreateProductModal } from 'features/product';
import { closeNotification } from 'features/notification';
import { Notifications } from 'entities/computed/notifications';

interface IDashboardProps {
  className?: string;
}

export const Dashboard: React.FC<IDashboardProps> = ({ className }) => {
  return (
    <div className={className}>
      <DashBoardGate />
      <Header />
      <TablesList />
      <CreateProductModal />
      <Notifications handleCloseNotification={closeNotification} />
    </div>
  );
};
