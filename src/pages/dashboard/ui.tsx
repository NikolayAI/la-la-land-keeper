import React from 'react';
import { useStore } from 'effector-react';

import { DashBoardGate } from './model';
import { TablesList } from 'widgets/table';
import { Header } from 'widgets/header';
import { CreateProductModal, } from 'features/product';
import { closeNotification } from 'features/notification';
import { tablesModel } from 'entities/tables';
import {
  Notifications,
  notificationsModel
} from 'entities/computed/notifications';

interface IDashboardProps {
  className?: string;
}

export const Dashboard: React.FC<IDashboardProps> = ({ className }) => {
  const tablesIds = useStore(tablesModel.$tablesIds);
  const tables = useStore(tablesModel.$tables);
  const tableProductsTimersNotifications = useStore(notificationsModel.$tableProductsTimersNotifications);
  return (
    <div className={className}>
      <DashBoardGate />
      <Header />
      <TablesList tables={tables} tablesIds={tablesIds} />
      <CreateProductModal />
      <Notifications
        notifications={tableProductsTimersNotifications}
        handleCloseNotification={closeNotification}
      />
    </div>
  );
};