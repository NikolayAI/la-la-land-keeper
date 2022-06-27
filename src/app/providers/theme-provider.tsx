import { createTheme, ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { useStore } from 'effector-react';
import React, { FC, useMemo } from 'react';

import { ColorThemes, IChildrenOnly } from '@/shared';
import { settingsModel } from '@/entities/computed/settings';

export const ThemeProvider: FC<IChildrenOnly> = ({ children }) => {
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

  return <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>;
};
