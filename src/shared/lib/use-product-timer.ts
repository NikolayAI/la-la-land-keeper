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
  pausedTimerCount: TableProductPausedTimerCountType;
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

  useEffect(() => {
    ref.current.pausedAt = pausedAt ?? new Date();
    ref.current.pausedTimerCount = pausedTimerCount;

    setTimer({
      tableId,
      productId,
      value:
        calculateTimerCount({
          createdAt,
          pausedAt: ref.current.pausedAt,
          isTimerPlay: ref.current.isTimerPlay,
          pausedTimerCount: ref.current.pausedTimerCount,
        }) ?? 0,
    });

    if (ref.current.isTimerPlay && !ref.current.intervalId) {
      ref.current.intervalId = setInterval(() => {
        setTimer({
          tableId,
          productId,
          value:
            calculateTimerCount({
              createdAt,
              pausedAt: ref.current.pausedAt,
              isTimerPlay: ref.current.isTimerPlay,
              pausedTimerCount: ref.current.pausedTimerCount,
            }) ?? 0,
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
  if (!isTimerPlay) {
    console.log('HELLO: ', isTimerPlay);
    return dateToSeconds(
      // @ts-ignore
      Number(new Date(pausedAt)) - Number(new Date(createdAt)) - pausedTimerCount
    );
  }
};
