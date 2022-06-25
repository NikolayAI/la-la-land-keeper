import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fork } from 'effector';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Dashboard } from '@/pages/dashboard';

import './styles/App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const scope = fork();

export const App = () => (
  <Provider value={scope}>
    <ThemeProvider theme={theme}>
      <Dashboard className="dashboard" />
      <NotificationsUI.Notifications />
    </ThemeProvider>
  </Provider>
);
