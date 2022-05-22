import { play, $isLoading as $isPlayLoading } from './model/play';
import { stop, $isLoading as $isStopLoading } from './model/stop';
import { Display } from './ui/timer';

export { IPlayTableProductTimerParams } from './model/play';
export { IStopProductTableTimerParams } from './model/stop';

export const tableProductTimerModel = {
  play,
  $isPlayLoading,
  stop,
  $isStopLoading,
};

export const TableProductTimerUI = {
  Timer: { Display },
};
