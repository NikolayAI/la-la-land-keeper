import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import {
  TableIdType,
  TableProductIdType,
  TableProductPausedAtType,
  TableProductPausedTimerCountType,
  TableProductTimerStatuses,
} from '@/shared';

import { $isLoading, play } from '../../model/play';

interface IconBtnProps {
  tableId: TableIdType;
  productId: TableProductIdType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
}

export const IconBtn: FC<IconBtnProps> = ({ tableId, productId, pausedAt, pausedTimerCount }) => (
  <IconButton
    role={`play-timer-button-${tableId}-${productId}`}
    size="small"
    disabled={useUnit($isLoading)?.[tableId]?.[productId]}
    onClick={() =>
      play({
        tableId,
        productId,
        pausedAt,
        timerStatus: TableProductTimerStatuses.play,
        // @ts-ignore
        pausedTimerCount: new Date() - new Date(pausedAt ?? new Date()) + pausedTimerCount,
      })
    }
  >
    <PlayArrowIcon fontSize="small" />
  </IconButton>
);
