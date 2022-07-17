import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Layout } from '@/widgets/layout';
import { Dashboard } from '@/pages/dashboard';

import { DndProvider, ScopeProvider, ThemeProvider } from './providers';

import './styles/App.css';

export const App = () => (
  <ScopeProvider>
    <ThemeProvider>
      <DndProvider>
        <Layout>
          <Dashboard className="dashboard" />
        </Layout>
        <NotificationsUI.Notifications />
      </DndProvider>
    </ThemeProvider>
  </ScopeProvider>
);
