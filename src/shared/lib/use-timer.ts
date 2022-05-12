import { useEffect, useRef } from 'react';

import { TableProductTimerStatuses } from '../constants';
import { ISetTablesProductsTimersParams, ProductIdType, TableIdType, TableProductCreatedAtType } from '../types';
import { dateToSeconds } from './format-date';
import { getLocalStorage } from './local-storage';

export const tablesProductsTimersKey = 'tablesProductsTimers';

interface IUseTimer {
  tableId: TableIdType;
  productId: ProductIdType;
  createdAt: TableProductCreatedAtType;
  isTimerPlay: boolean;
  timerStatus: TableProductTimerStatuses;
  interval: number;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
}

export interface ITableProductTimerRef {
  // eslint-disable-next-line no-undef
  intervalId: NodeJS.Timer | null;
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
    if (ref.current.isTimerPlay) {
      return dateToSeconds(Number(new Date()) - Number(new Date(createdAt)) - ref.current.pausedTimerCount);
    }
    if (!ref.current.isTimerPlay) {
      return dateToSeconds(
        // @ts-ignore
        Number(new Date(ref.current.pausedAt)) - Number(new Date(createdAt)) - ref.current.pausedTimerCount
      );
    }
    return 0;
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
