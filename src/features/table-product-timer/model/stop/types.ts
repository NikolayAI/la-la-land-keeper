import { ISetTableProductTimerStatusParams, TableProductTimerStatuses } from '@/shared';

export interface IStopProductTableTimerParams extends ISetTableProductTimerStatusParams {
  timerStatus: TableProductTimerStatuses.stop;
}
