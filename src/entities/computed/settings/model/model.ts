import { createEffect, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { ColorThemes, LocalStorageKeys } from '@/shared';

export const setColorThemeFx = createEffect<ColorThemes, ColorThemes>();

export const $colorTheme = createStore<ColorThemes>(ColorThemes.light);

setColorThemeFx.use((theme) => {
  return theme;
});

persist({ store: $colorTheme, key: LocalStorageKeys.colorTheme });

sample({
  clock: setColorThemeFx.doneData,
  target: $colorTheme,
});
