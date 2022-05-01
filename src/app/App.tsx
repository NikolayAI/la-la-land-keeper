import { fork } from 'effector';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import { NotificationsUI } from '@/entities/computed/notifications';
import { Dashboard } from '@/pages/dashboard';
import './styles/App.css';

const scope = fork();

export const App = () => (
  <Provider value={scope}>
    <Dashboard className="dashboard" />
    <NotificationsUI.Notifications />
  </Provider>
);
