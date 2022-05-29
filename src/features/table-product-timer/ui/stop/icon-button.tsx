import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType, TableProductIdType, TableProductPausedTimerCountType, TableProductTimerStatuses } from '@/shared';
import { $isLoading, stop } from '../../model/stop';

interface IconBtnProps {
  tableId: TableIdType;
  productId: TableProductIdType;
  pausedTimerCount: TableProductPausedTimerCountType;
}

export const IconBtn: FC<IconBtnProps> = ({ tableId, productId, pausedTimerCount }) => (
  <IconButton
    role={`stop-timer-button-${tableId}-${productId}`}
    size="small"
    disabled={useStore($isLoading)?.[tableId]?.[productId]}
    onClick={() =>
      stop({
        tableId,
        productId,
        pausedAt: new Date(),
        timerStatus: TableProductTimerStatuses.stop,
        pausedTimerCount,
      })
    }
  >
    <PauseIcon fontSize="small" />
  </IconButton>
);
