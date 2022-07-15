import { toggleColorTheme } from './model/toggle-color-theme';
import { Switch as ColorThemeSwitch } from './ui/change-color-theme';

export const settingModel = {
  setColorTheme: toggleColorTheme,
};

export const SettingUI = {
  ColorThemeSwitch,
};
