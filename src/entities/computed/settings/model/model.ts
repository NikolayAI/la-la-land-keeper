import { createEffect, createStore, forward } from 'effector';

import { ColorThemes } from '@/shared';

export const setColorThemeFx = createEffect<ColorThemes, ColorThemes>();

export const $colorTheme = createStore<ColorThemes>(ColorThemes.light);

setColorThemeFx.use((theme) => {
  return theme;
});

forward({
  from: setColorThemeFx.doneData,
  to: $colorTheme,
});
