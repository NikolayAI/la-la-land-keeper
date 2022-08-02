import React, { FC } from 'react';

import { TableUI } from '@/features/table';
import { TablesList } from '@/widgets/table';

export const TablesPage: FC = () => (
  <>
    <div className="tables-page__actions">
      <TableUI.CreateBtn className="tables-page__button tables-page__button_create" />
    </div>
    <TablesList className="tables-page__tables-list" />
  </>
);
