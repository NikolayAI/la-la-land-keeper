import { fork } from 'effector';
import { Provider } from 'effector-react/ssr';
import React from 'react';

import './styles/App.css';
import { Notifications } from 'entities/computed/notifications';
import { closeNotification } from 'features/notification';
import { Dashboard } from 'pages/dashboard';

const scope = fork();

export const App = () => (
    <Provider value={scope}>
      <Dashboard className="dashboard" />
      <Notifications handleCloseNotification={closeNotification} />
    </Provider>
  );
