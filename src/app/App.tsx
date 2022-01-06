import React from 'react';

import './styles/App.css';
import { Dashboard } from '../pages/dashboard';
import { handleNotifications } from '../features/notification/handleNotifications';

function App() {
  return (
    <Dashboard />
  );
}

const initEffectorUnitsIntoNonModulesFiles = (args: any[]) => {
};
initEffectorUnitsIntoNonModulesFiles([handleNotifications]);

export default App;
