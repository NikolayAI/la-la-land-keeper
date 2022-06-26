import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fork } from 'effector';
import { useStore } from 'effector-react';
import { Provider } from 'effector-react/ssr';
import React, { useMemo } from 'react';

import { ColorThemes } from '@/shared';
import { NotificationsUI } from '@/entities/computed/notifications';
import { settingsModel } from '@/entities/computed/settings';
import { Dashboard } from '@/pages/dashboard';

import './styles/App.css';

const scope = fork();

export const App = () => {
  const colorTheme = useStore(settingsModel.$colorTheme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorTheme === ColorThemes.light ? ColorThemes.light : ColorThemes.dark,
        },
      }),
    [colorTheme]
  );

  return (
    <Provider value={scope}>
      <ThemeProvider theme={theme}>
        <Dashboard className="dashboard" />
        <NotificationsUI.Notifications />
      </ThemeProvider>
    </Provider>
  );
};
