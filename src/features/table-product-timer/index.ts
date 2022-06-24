import { $isLoading as $isPlayLoading, play } from './model/play';
import { $isLoading as $isStopLoading, stop } from './model/stop';
import { IconBtn as PlayIconBtn } from './ui/play';
import { IconBtn as StopIconBtn } from './ui/stop';

export type { IPlayTableProductTimerParams } from './model/play';
export type { IStopProductTableTimerParams } from './model/stop';

export const tableProductTimerModel = {
  play,
  $isPlayLoading,
  stop,
  $isStopLoading,
};

export const TableProductTimerUI = {
  PlayIconBtn,
  StopIconBtn,
};
