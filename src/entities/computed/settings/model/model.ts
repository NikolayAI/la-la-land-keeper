import { createEffect, createStore, sample } from 'effector';

import { ColorThemes } from '@/shared';

export const setColorThemeFx = createEffect<ColorThemes, ColorThemes>();

export const $colorTheme = createStore<ColorThemes>(ColorThemes.light);

setColorThemeFx.use((theme) => {
  return theme;
});

sample({
  clock: setColorThemeFx.doneData,
  target: $colorTheme,
});
