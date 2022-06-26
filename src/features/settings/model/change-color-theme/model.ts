import { createEvent, forward } from 'effector';

import { ColorThemes } from '@/shared';
import { settingsModel } from '@/entities/computed/settings';

export const setColorTheme = createEvent<ColorThemes>();

forward({
  from: setColorTheme,
  to: settingsModel.setColorThemeFx,
});
