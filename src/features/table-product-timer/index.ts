import { play } from './model/play';
import { stop } from './model/stop';
import { Display } from './ui/timer';

export { IPlayTableProductTimerParams } from './model/play';
export { IStopProductTableTimerParams } from './model/stop';

export const tableProductTimerModel = {
  play,
  stop,
};

export const TableProductTimerUI = {
  Timer: { Display },
};
