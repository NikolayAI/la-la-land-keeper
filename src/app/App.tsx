import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Drawer } from '@/widgets/drawer';
import { Header } from '@/widgets/header';
import { Dashboard } from '@/pages/dashboard';

import { DndProvider, ScopeProvider, ThemeProvider } from './providers';

import './styles/App.css';

export const App = () => (
  <ScopeProvider>
    <ThemeProvider>
      <DndProvider>
        <Drawer>
          <Header />
          <Dashboard className="dashboard" />
        </Drawer>
        <NotificationsUI.Notifications />
      </DndProvider>
    </ThemeProvider>
  </ScopeProvider>
);
