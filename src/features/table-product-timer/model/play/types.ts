import { ISetTableProductTimerStatusParams, TableProductTimerStatuses } from '@/shared';

export interface IPlayTableProductTimerParams extends ISetTableProductTimerStatusParams {
  value: TableProductTimerStatuses.PLAY;
}
