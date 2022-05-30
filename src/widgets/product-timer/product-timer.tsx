import { useStore } from 'effector-react';
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
import { ProductsUI } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
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
  const tablesProductsTimers = useStore(tablesModel.$tablesProductsTimers);

  return (
    <ProductsUI.ProductTimer
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
        <TableProductTimerUI.Stop.IconBtn tableId={tableId} productId={productId} pausedTimerCount={pausedTimerCount} />
      }
      PlayTimerSlot={
        <TableProductTimerUI.Play.IconBtn
          tableId={tableId}
          productId={productId}
          pausedTimerCount={pausedTimerCount}
          pausedAt={pausedAt}
        />
      }
    />
  );
};
