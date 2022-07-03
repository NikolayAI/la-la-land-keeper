import React, { FC } from 'react';
import { ClassNameType } from '@/shared';
import { ProductUI } from '@/features/product';
import { TablesList } from '@/widgets/table';

import { DashBoardGate } from './model';

interface IDashboardProps {
  className?: ClassNameType;
}

export const Dashboard: FC<IDashboardProps> = ({ className }) => (
  <>
    <DashBoardGate />
    <div className={className}>
      <TablesList />
      <ProductUI.CreateModal />
    </div>
  </>
);
