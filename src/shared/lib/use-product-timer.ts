import { useEffect, useRef } from 'react';

import {
  ISetTablesProductsTimersParams,
  ProductIdType,
  TableIdType,
  TableProductCreatedAtType,
  TableProductPausedAtType,
  TableProductPausedTimerCountType,
  TableProductTimerStatusType,
} from '../types';
import { dateToSeconds } from './format-date';

interface IUseTimer {
  tableId: TableIdType;
  productId: ProductIdType;
  createdAt: TableProductCreatedAtType;
  isTimerPlay: boolean;
  timerStatus: TableProductTimerStatusType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
  interval: number;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
}

export interface ITableProductTimerRef {
  // eslint-disable-next-line no-undef
  intervalId: NodeJS.Timer | null;
  isTimerPlay: boolean;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: number;
}

export const useProductTimer = ({
  tableId,
  productId,
  createdAt,
  isTimerPlay,
  timerStatus,
  pausedTimerCount,
  pausedAt,
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
  };

  useEffect(() => {
    ref.current.pausedAt = pausedAt ?? new Date();
    ref.current.pausedTimerCount = pausedTimerCount;

    setTimer({
      tableId,
      productId,
      value: calculateTimerCount() ?? 0,
    });

    if (!ref.current.isTimerPlay && ref.current.intervalId) {
      clearInterval(ref.current.intervalId);
      ref.current.intervalId = null;
    }

    if (ref.current.isTimerPlay && !ref.current.intervalId) {
      ref.current.intervalId = setInterval(() => {
        setTimer({
          tableId,
          productId,
          value: calculateTimerCount() ?? 0,
        });
      }, interval);
    }

    return () => {
      if (ref.current.intervalId) {
        clearInterval(ref.current.intervalId);
        ref.current.intervalId = null;
      }
    };
  }, [timerStatus]);
};
