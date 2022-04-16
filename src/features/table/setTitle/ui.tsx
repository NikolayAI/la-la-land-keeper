import React, { FC } from 'react';

import { EditableText } from 'shared/ui';
import { setTitle } from './model';

interface ISetTableTitleProps {
  tableId: string;
  tableTitle: string;
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
