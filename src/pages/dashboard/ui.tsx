import React from 'react';import { useStore } from 'effector-react';import { Grid } from '@mui/material';import { DashBoardGate } from './model';import { Table } from '../../widgets/table';import { Header } from '../../widgets/header';import { CreateProductModal } from '../../features/product';import { closeNotification } from '../../features/notification';import { tablesModel } from '../../entities/tables';import {  Notifications,  notificationsModel} from '../../entities/notifications';export const Dashboard: React.FC = () => {  const tablesIds = useStore(tablesModel.$tablesIds);  const tables = useStore(tablesModel.$tables);  const tableProductsTimersNotifications = useStore(notificationsModel.$tableProductsTimersNotifications);  return (    <>      <DashBoardGate />      <Header />      <Grid container spacing={0}>        {          tablesIds.length            ? tablesIds.map((tableId) => (              <Table key={tableId} tableId={tableId} tables={tables} />            )) : null        }      </Grid>      <CreateProductModal />      <Notifications        notifications={tableProductsTimersNotifications}        handleCloseNotification={closeNotification}      />    </>  );};