import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import {
  TableIdType,
  TableProductCreatedAtType,
  TableProductIdType,
  TableProductMinutesLimitType,
  TableProductPausedAtType,
  TableProductPausedTimerCountType,
  TableProductTimerStatusType,
  TableProductUnitsType,
} from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { TableProductTimerUI } from '@/features/table-product-timer';

interface IProductTimerProps {
  tableId: TableIdType;
  productId: TableProductIdType;
  timerStatus: TableProductTimerStatusType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
  createdAt: TableProductCreatedAtType;
  minutesLimit: TableProductMinutesLimitType;
  productUnits: TableProductUnitsType;
}

export const ProductTimer: FC<IProductTimerProps> = ({
  tableId,
  productId,
  pausedAt,
  timerStatus,
  pausedTimerCount,
  createdAt,
  minutesLimit,
  productUnits,
}) => {
  const tablesProductsTimers = useUnit(tablesModel.$tablesProductsTimers);

  return (
    <TablesUI.ProductTimer
      tableId={tableId}
      productId={productId}
      timerStatus={timerStatus}
      pausedAt={pausedAt}
      pausedTimerCount={pausedTimerCount}
      createdAt={createdAt}
      minutesLimit={minutesLimit}
      productUnits={productUnits}
      setTimer={tablesModel.setTablesProductsTimers}
      tablesProductsTimers={tablesProductsTimers}
      StopTimerSlot={
        <TableProductTimerUI.StopIconBtn tableId={tableId} productId={productId} pausedTimerCount={pausedTimerCount} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.PlayIconBtn
          tableId={tableId}
          productId={productId}
          pausedTimerCount={pausedTimerCount}
          pausedAt={pausedAt}
        />
      }
    />
  );
};
