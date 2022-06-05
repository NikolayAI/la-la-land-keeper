import { IconButton } from '@mui/material';
import React, { FC, memo, ReactNode } from 'react';

import {
  ISetTablesProductsTimersParams,
  TableIdType,
  TableProductCreatedAtType,
  TableProductIdType,
  TableProductMinutesLimitType,
  TableProductPausedAtType,
  TableProductPausedTimerCountType,
  TableProductsTimersType,
  TableProductTimerStatuses,
  TableProductTimerStatusType,
  TableProductUnitsType,
  useProductTimer,
} from '@/shared';

interface IProductTimer {
  tableId: TableIdType;
  productId: TableProductIdType;
  timerStatus: TableProductTimerStatusType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
  createdAt: TableProductCreatedAtType;
  minutesLimit: TableProductMinutesLimitType;
  productUnits: TableProductUnitsType;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
  tablesProductsTimers: TableProductsTimersType;
  StopTimerSlot: ReactNode;
  PlayTimerSlot: ReactNode;
}

export const ProductTimer: FC<IProductTimer> = memo(
  ({
    tableId,
    productId,
    pausedAt,
    timerStatus,
    pausedTimerCount,
    createdAt,
    minutesLimit,
    productUnits,
    setTimer,
    tablesProductsTimers,
    StopTimerSlot,
    PlayTimerSlot,
  }) => {
    const timerCount = tablesProductsTimers[tableId]?.[productId];
    const isTimerPlay = timerStatus === TableProductTimerStatuses.play;

    useProductTimer({
      tableId,
      productId,
      createdAt,
      isTimerPlay,
      timerStatus,
      pausedAt,
      pausedTimerCount,
      setTimer,
      interval: 1000,
    });

    return (
      <div role={`product-timer-${tableId}-${productId}`}>
        <IconButton color="primary" size="small" sx={{ cursor: 'default' }}>
          {`${timerCount}`}
        </IconButton>
        <IconButton color="default" size="small" sx={{ cursor: 'default' }}>
          / {minutesLimit * productUnits}
        </IconButton>
        {isTimerPlay ? StopTimerSlot : PlayTimerSlot}
      </div>
    );
  }
);
