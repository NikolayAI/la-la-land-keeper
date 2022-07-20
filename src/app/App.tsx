import { Route } from 'atomic-router-react';
import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Layout } from '@/widgets/layout';
import { productsRoute, ProductsPage } from '@/pages/products';
import { tablesRoute, TablesPage } from '@/pages/tables';

import { Providers } from './providers';

import './styles/App.css';

export const App = () => (
  <Providers>
    <Layout>
      <Route route={tablesRoute} view={TablesPage} />
      <Route route={productsRoute} view={ProductsPage} />
    </Layout>
    <NotificationsUI.Notifications />
  </Providers>
);
