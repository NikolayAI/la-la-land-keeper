import { ISetTableProductTimerStatusParams, TableProductTimerStatuses } from '@/shared';

export interface IPlayTableProductTimerParams extends ISetTableProductTimerStatusParams {
  timerStatus: TableProductTimerStatuses.play;
}
