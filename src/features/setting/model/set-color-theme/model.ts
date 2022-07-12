import { createEvent, sample } from 'effector';

import { ColorThemes } from '@/shared';
import { settingsModel } from '@/entities/computed/settings';

export const setColorTheme = createEvent<ColorThemes>();

sample({
  clock: setColorTheme,
  target: settingsModel.setColorThemeFx,
});
