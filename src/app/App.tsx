import React from 'react';
import { fork } from 'effector';
import { Provider } from 'effector-react/scope';

import './styles/App.css';
import { Dashboard } from '../pages/dashboard';

const scope = fork();

export const App = () => {
  return (
    <Provider value={scope}>
      <Dashboard className="dashboard" />
    </Provider>
  );
};
