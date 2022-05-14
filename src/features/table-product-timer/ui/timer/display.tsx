import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC, memo } from 'react';

import {
  ISetTablesProductsTimersParams,
  TableIdType,
  TableProductCreatedAtType,
  TableProductIdType,
  TableProductMinutesLimitType,
  TableProductPausedAtType,
  TableProductPausedTimerCountType,
  TableProductTimerStatuses,
  TableProductTimerStatusType,
  TableProductUnitsType,
  useProductTimer,
} from '@/shared';
import { tablesModel } from '@/entities/tables';
import { play } from '../../model/play';
import { stop } from '../../model/stop';

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
}

export const Display: FC<IProductTimer> = memo(
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
  }) => {
    const tablesProductsTimers = useStore(tablesModel.$tablesProductsTimers);

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

    const handlePause = () => {
      stop({
        tableId,
        productId,
        timerStatus: TableProductTimerStatuses.stop,
        pausedAt: new Date(),
        pausedTimerCount,
      });
    };

    const handlePlay = () => {
      play({
        tableId,
        productId,
        pausedAt,
        timerStatus: TableProductTimerStatuses.play,
        // @ts-ignore
        pausedTimerCount: new Date() - new Date(pausedAt ?? new Date()) + pausedTimerCount,
      });
    };

    return (
      <div role={`product-timer-display-${tableId}-${productId}`}>
        <IconButton color="primary" size="small" sx={{ cursor: 'default' }}>
          {`${timerCount}`}
        </IconButton>
        <IconButton color="default" size="small" sx={{ cursor: 'default' }}>
          / {minutesLimit * productUnits}
        </IconButton>
        {isTimerPlay ? (
          <IconButton role="pause-timer-button" size="small" onClick={handlePause}>
            <PauseIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton role="play-timer-button" size="small" onClick={handlePlay}>
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    );
  }
);
