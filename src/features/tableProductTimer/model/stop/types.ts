import {
  ISetTableProductTimerStatusParams,
  TableProductTimerStatuses,
} from 'shared/api';

export interface IStopProductTableTimerParams
  extends ISetTableProductTimerStatusParams {
  value: TableProductTimerStatuses.STOP;
}