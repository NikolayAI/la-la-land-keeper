import {
  ISetTableProductTimerStatusParams,
  TableProductTimerStatuses,
} from 'shared/api';

export interface IPlayTableProductTimerParams
  extends ISetTableProductTimerStatusParams {
  value: TableProductTimerStatuses.PLAY;
}
