import { createEvent, sample } from 'effector';

import { ColorThemes } from '@/shared';
import { settingsModel } from '@/entities/computed/settings';

export const toggleColorTheme = createEvent();

sample({
  clock: toggleColorTheme,
  source: settingsModel.$colorTheme,
  fn: (colorTheme) => {
    if (colorTheme === ColorThemes.dark) return ColorThemes.light;
    if (colorTheme === ColorThemes.light) return ColorThemes.dark;
    return ColorThemes.light;
  },
  target: settingsModel.setColorThemeFx,
});
