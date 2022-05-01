import {
  ISetTableProductTimerStatusParams,
  TableProductTimerStatuses,
} from '@/shared';

export interface IStopProductTableTimerParams
  extends ISetTableProductTimerStatusParams {
  value: TableProductTimerStatuses.STOP;
}
