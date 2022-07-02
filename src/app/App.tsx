import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Header } from '@/widgets/header';
import { Dashboard } from '@/pages/dashboard';

import { ThemeProvider, ScopeProvider, DndProvider } from './providers';

import './styles/App.css';

export const App = () => (
  <ScopeProvider>
    <ThemeProvider>
      <Header />
      <DndProvider>
        <Dashboard className="dashboard" />
      </DndProvider>
      <NotificationsUI.Notifications />
    </ThemeProvider>
  </ScopeProvider>
);
