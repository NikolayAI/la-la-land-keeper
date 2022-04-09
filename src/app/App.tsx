import React from 'react';
import { fork } from 'effector';
import { Provider } from 'effector-react/ssr';

import './styles/App.css';
import { Dashboard } from 'pages/dashboard';
import { closeNotification } from 'features/notification';
import { Notifications } from 'entities/computed/notifications';

const scope = fork();

export const App = () => {
  return (
    <Provider value={scope}>
      <Dashboard className="dashboard" />
      <Notifications handleCloseNotification={closeNotification} />
    </Provider>
  );
};
