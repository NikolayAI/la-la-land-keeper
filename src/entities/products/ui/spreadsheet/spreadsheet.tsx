import TableCell from '@mui/material/TableCell';
import MaterialTableRow from '@mui/material/TableRow';
import { Identifier } from 'dnd-core';
import React, { CSSProperties, FC, ReactNode, RefObject } from 'react';

import { IProduct } from '@/shared';

export interface ISpreadSheetRow extends IProduct {
  actions: ReactNode[];
}

interface ISpreadSheetRowProps {
  row: ISpreadSheetRow;
  tableRowRef?: RefObject<HTMLTableRowElement>;
  style?: CSSProperties;
  handlerId?: Identifier | null;
}

export const SpreadSheetRow: FC<ISpreadSheetRowProps> = ({ row, tableRowRef, style, handlerId }) => (
  <MaterialTableRow ref={tableRowRef} style={style} data-handler-id={handlerId}>
    <TableCell component="th" scope="row">
      {row.name}
    </TableCell>
    <TableCell align="right">{row.isPiece ? 'Да' : 'Нет'}</TableCell>
    <TableCell align="right">{row.needTimer ? 'Да' : 'Нет'}</TableCell>
    <TableCell align="right">{row.price}</TableCell>
    <TableCell align="center">{row.actions}</TableCell>
  </MaterialTableRow>
);
