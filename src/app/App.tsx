import React from 'react';
import { fork } from 'effector';
import { Provider } from 'effector-react/scope';

import './styles/App.css';
import { Dashboard } from '@pages/dashboard';

export const App = () => {
  return (
    <Provider value={fork()}>
      <Dashboard className="dashboard" />
    </Provider>
  );
};
