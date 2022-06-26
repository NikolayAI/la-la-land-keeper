import { createEffect, createStore, forward } from 'effector';

import { ColorThemes } from '@/shared';

export const setColorThemeFx = createEffect<ColorThemes, void>();

export const $colorTheme = createStore<ColorThemes>(ColorThemes.light);

forward({
  from: setColorThemeFx,
  to: $colorTheme,
});
