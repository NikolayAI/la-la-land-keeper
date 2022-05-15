import React, { FC } from 'react';

import { TableIdType, TableNameType, EditableText } from '@/shared';
import { setName } from '../../model/setName';

interface ISetTableNameProps {
  tableId: TableIdType;
  tableName: TableNameType;
}

export const Field: FC<ISetTableNameProps> = ({ tableId, tableName }) => (
  <EditableText
    role={`editable-table-name-${tableId}`}
    text={tableName}
    setTableName={(text: string) => {
      setName({ id: tableId, text });
    }}
  />
);
