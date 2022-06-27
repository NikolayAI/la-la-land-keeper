import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Dashboard } from '@/pages/dashboard';

import './styles/App.css';
import { ThemeProvider, ScopeProvider } from './providers';

export const App = () => (
  <ScopeProvider>
    <ThemeProvider>
      <Dashboard className="dashboard" />
      <NotificationsUI.Notifications />
    </ThemeProvider>
  </ScopeProvider>
);
