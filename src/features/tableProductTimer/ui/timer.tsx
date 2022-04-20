import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { useEffect, FC, memo } from 'react';

import {
  ISetTablesProductsTimersParams,
  TableProductTimerStatuses,
  TablesType,
} from 'shared/api';
import {
  getLocalStorage,
  setLocalStorage,
  tablesProductsTimersKey,
  useTimer,
} from 'shared/lib';
import { tablesModel } from 'entities/tables';
import { IPlayTableProductTimerParams } from '../play';
import { IStopProductTableTimerParams } from '../stop';

interface IProductTimer {
  tables: TablesType;
  tableId: string;
  productId: string;
  createdAt: string | Date;
  minutesLimit: number;
  productUnits: number;
  setTimer: (payload: ISetTablesProductsTimersParams) => void;
  handleStopTimer: (payload: IStopProductTableTimerParams) => void;
  handlePlayTimer: (payload: IPlayTableProductTimerParams) => void;
}

export const Timer: FC<IProductTimer> = memo(
  ({
    tables,
    tableId,
    productId,
    createdAt,
    minutesLimit,
    productUnits,
    setTimer,
    handleStopTimer,
    handlePlayTimer,
  }) => {
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
              ...(timers[tableId] ?? {}),
              [productId]: {
                ...(timers[tableId]?.[productId] ?? {}),
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
      handleStopTimer({
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
      handlePlayTimer({
        tableId,
        productId,
        value: TableProductTimerStatuses.PLAY,
      });

      const updateStorage = () => {
        const timers = getLocalStorage({ key: tablesProductsTimersKey }) ?? {};
        const pausedAt = timers[tableId]?.[productId]?.pausedAt ?? new Date();
        let pausedTimerCount =
          timers[tableId]?.[productId]?.pausedTimerCount ?? 0;
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
      <>
        <IconButton color="primary" size="small" sx={{ cursor: 'default' }}>
          {`${timerCount}`}
        </IconButton>
        <IconButton color="default" size="small" sx={{ cursor: 'default' }}>
          / {minutesLimit * productUnits}
        </IconButton>
        {isTimerPlay ? (
          <IconButton
            role="pause-timer-button"
            size="small"
            onClick={handlePause}
          >
            <PauseIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton
            role="play-timer-button"
            size="small"
            onClick={handlePlay}
          >
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        )}
      </>
    );
  }
);
