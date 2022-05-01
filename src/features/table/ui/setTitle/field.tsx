import React, { FC } from 'react';

import { TableIdType, TableTitleType, EditableText } from '@/shared';
import { setTitle } from '../../model/setTitle';

interface ISetTableTitleProps {
  tableId: TableIdType;
  tableTitle: TableTitleType;
}

export const Field: FC<ISetTableTitleProps> = ({ tableId, tableTitle }) => (
  <EditableText
    role={`editable-table-title-${tableId}`}
    text={tableTitle}
    setTableTitle={(text: string) => {
      setTitle({ id: tableId, text });
    }}
  />
);
