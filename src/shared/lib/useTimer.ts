import { useEffect, useRef } from 'react';

import { dateToSeconds } from './formatDate';
import {
  ISetTablesProductsTimersParams,
  TableProductTimerStatuses
} from '../api';
import { getLocalStorage } from './localStorage';

export const tablesProductsTimersKey = 'tablesProductsTimers';

interface IUseTimer {
  tableId: string;
  productId: string;
  createdAt: string | Date,
  isTimerPlay: boolean;
  timerStatus: TableProductTimerStatuses;
  interval: number;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
}

export interface ITableProductTimerRef {
  intervalId: NodeJS.Timeout | null;
  isTimerPlay: boolean;
  pausedAt: Date | null;
  pausedTimerCount: number;
}

export const useTimer = ({
  tableId,
  productId,
  createdAt,
  isTimerPlay,
  timerStatus,
  interval,
  setTimer,
}: IUseTimer) => {
  const ref = useRef<ITableProductTimerRef>({
    intervalId: null,
    isTimerPlay: false,
    pausedAt: null,
    pausedTimerCount: 0,
  });

  ref.current.isTimerPlay = isTimerPlay;


  const calculateTimerCount = () => {
    return dateToSeconds(Number(new Date()) - Number(new Date(createdAt)) - ref.current.pausedTimerCount);
  };

  useEffect(() => {
    const timers = getLocalStorage({ key: tablesProductsTimersKey }) ?? {};
    ref.current.pausedAt = timers[tableId]?.[productId]?.pausedAt ?? new Date();
    ref.current.pausedTimerCount = timers[tableId]?.[productId]?.pausedTimerCount ?? 0;

    setTimer({
      tableId,
      productId,
      value: calculateTimerCount(),
    });

    if (!ref.current.isTimerPlay) {
      if (ref.current.intervalId) {
        clearInterval(ref.current.intervalId);
        ref.current.intervalId = null;
      }
    }

    if (ref.current.isTimerPlay) {
      if (!ref.current.intervalId) {
        ref.current.intervalId = setInterval(() => {
          setTimer({
            tableId,
            productId,
            value: calculateTimerCount(),
          });
        }, interval);
      }
    }

    return () => {
      if (ref.current.intervalId) {
        clearInterval(ref.current.intervalId);
        ref.current.intervalId = null;
      }
    };

  }, [timerStatus]);
};
