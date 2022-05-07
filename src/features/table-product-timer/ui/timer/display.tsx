import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC, memo, useEffect } from 'react';

import {
  ISetTablesProductsTimersParams,
  TableProductTimerStatuses,
  TablesType,
  getLocalStorage,
  setLocalStorage,
  tablesProductsTimersKey,
  useTimer,
  TableIdType,
  TableProductCreatedAtType,
  TableProductIdType,
  TableProductMinutesLimitType,
  TableProductUnitsType,
} from '@/shared';
import { tablesModel } from '@/entities/tables';
import { play } from '../../model/play';
import { stop } from '../../model/stop';

interface IProductTimer {
  tables: TablesType;
  tableId: TableIdType;
  productId: TableProductIdType;
  createdAt: TableProductCreatedAtType;
  minutesLimit: TableProductMinutesLimitType;
  productUnits: TableProductUnitsType;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
}

export const Display: FC<IProductTimer> = memo(
  ({ tables, tableId, productId, createdAt, minutesLimit, productUnits, setTimer }) => {
    const tablesProductsTimers = useStore(tablesModel.$tablesProductsTimers);
    const timerStatus = tables[tableId].products[productId]?.timerStatus;
    const timerCount = tablesProductsTimers[tableId]?.[productId] ?? 0;
    const isTimerPlay = timerStatus === TableProductTimerStatuses.PLAY;

    useTimer({
      tableId,
      productId,
      createdAt,
      isTimerPlay,
      timerStatus,
      setTimer,
      interval: 1000,
    });

    useEffect(
      () => () => {
        const timers = getLocalStorage({ key: tablesProductsTimersKey });
        setLocalStorage({
          key: tablesProductsTimersKey,
          value: {
            ...(timers ?? {}),
            [tableId]: {
              ...(timers?.[tableId] ?? {}),
              [productId]: {
                ...(timers?.[tableId]?.[productId] ?? {}),
                pausedAt: null,
                pausedTimerCount: 0,
              },
            },
          },
        });
      },
      []
    );

    const handlePause = () => {
      stop({
        tableId,
        productId,
        value: TableProductTimerStatuses.STOP,
      });

      const timers = getLocalStorage({ key: tablesProductsTimersKey }) ?? {};

      setLocalStorage({
        key: tablesProductsTimersKey,
        value: {
          ...(timers ?? {}),
          [tableId]: {
            ...(timers[tableId] ?? {}),
            [productId]: {
              ...(timers[tableId]?.[productId] ?? {}),
              pausedAt: new Date(),
            },
          },
        },
      });
    };

    const handlePlay = () => {
      play({
        tableId,
        productId,
        value: TableProductTimerStatuses.PLAY,
      });

      const updateStorage = () => {
        const timers = getLocalStorage({ key: tablesProductsTimersKey }) ?? {};
        const pausedAt = timers[tableId]?.[productId]?.pausedAt ?? new Date();
        let pausedTimerCount = timers[tableId]?.[productId]?.pausedTimerCount ?? 0;
        // @ts-ignore
        pausedTimerCount = new Date() - new Date(pausedAt) + pausedTimerCount;

        setLocalStorage({
          key: tablesProductsTimersKey,
          value: {
            ...(timers ?? {}),
            [tableId]: {
              ...(timers[tableId] ?? {}),
              [productId]: {
                ...(timers[tableId]?.[productId] ?? {}),
                pausedTimerCount: pausedTimerCount,
              },
            },
          },
        });
      };
      updateStorage();
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
