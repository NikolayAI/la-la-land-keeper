import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType, TableNameType, EditableText } from '@/shared';
import { setName, $isLoading } from '../../model/setName';

interface ISetTableNameProps {
  tableId: TableIdType;
  tableName: TableNameType;
}

export const Field: FC<ISetTableNameProps> = ({ tableId, tableName }) => {
  const isLoading = useStore($isLoading);
  return (
    <EditableText
      role={`editable-table-name-${tableId}`}
      text={tableName}
      isLoading={isLoading}
      setTableName={(text: string) => {
        setName({ id: tableId, text });
      }}
    />
  );
};
