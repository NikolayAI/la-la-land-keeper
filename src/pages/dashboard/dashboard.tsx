import React, { FC } from 'react';

import { ClassNameType } from '@/shared';
import { ProductUI } from '@/features/product';
import { Header } from '@/widgets/header';
import { TablesList } from '@/widgets/table';
import { DashBoardGate } from './model';

interface IDashboardProps {
  className?: ClassNameType;
}

export const Dashboard: FC<IDashboardProps> = ({ className }) => (
  <>
    <DashBoardGate />
    <div className={className}>
      <Header />
      <TablesList />
      <ProductUI.Create.Modal />
    </div>
  </>
);
