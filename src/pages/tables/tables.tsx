import React, { FC } from 'react';
import { ProductUI } from '@/features/product';
import { TableUI } from '@/features/table';
import { TablesList } from '@/widgets/table';

export const TablesPage: FC = () => (
  <div className="dashboard">
    <TableUI.CreateBtn />
    <TablesList />
    <ProductUI.CreateModal />
  </div>
);
