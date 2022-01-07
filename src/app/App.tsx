import React from 'react';

import './styles/App.css';
import { Dashboard } from '../pages/dashboard';
import {initHandleNotifications} from '../features/notification/handleNotifications';

function App() {
  return (
    <Dashboard />
  );
}

initHandleNotifications();

export default App;
