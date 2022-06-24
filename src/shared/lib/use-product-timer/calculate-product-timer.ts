import { TableProductCreatedAtType, TableProductPausedAtType, TableProductPausedTimerCountType } from '../../types';
import { dateToSeconds } from '../format-date';

interface ICalculateTimerCountParams {
  isTimerPlay: boolean;
  createdAt: TableProductCreatedAtType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
}

export const calculateTimerCount = ({
  isTimerPlay,
  createdAt,
  pausedAt,
  pausedTimerCount,
}: ICalculateTimerCountParams) => {
  if (isTimerPlay) {
    return dateToSeconds(Number(new Date()) - Number(new Date(createdAt)) - pausedTimerCount);
  }
  return dateToSeconds(
    // @ts-ignore
    Number(new Date(pausedAt)) - Number(new Date(createdAt)) - pausedTimerCount
  );
};
