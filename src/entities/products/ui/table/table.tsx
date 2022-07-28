import Paper from '@mui/material/Paper';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MaterialTableRow from '@mui/material/TableRow';
import { useStore } from 'effector-react';
import React, { FC, ReactNode } from 'react';

import { DndItems, IProduct, useSortableDnd } from '@/shared';
import { productsModel } from '@/entities/products';
import { tableModel } from '@/features/table';

import { columns } from './constants';

interface ITableRow extends IProduct {
  actions: ReactNode[];
}

interface ITableRowProps {
  row: ITableRow;
  index: number;
}

export const TableRow: FC<ITableRowProps> = ({ row, index }) => {
  const { ref, handlerId, opacity } = useSortableDnd<ITableRowProps, HTMLTableRowElement>({
    itemId: row?.id,
    itemIndex: index,
    itemTargetType: DndItems.productsTableRow,
    onDragDataHandler: tableModel.dragAndDrop,
  });

  return (
    <MaterialTableRow ref={ref} key={row.name} style={{ opacity }} data-handler-id={handlerId}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.isPiece ? 'Да' : 'Нет'}</TableCell>
      <TableCell align="right">{row.needTimer ? 'Да' : 'Нет'}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="center">{row.actions}</TableCell>
    </MaterialTableRow>
  );
};

interface ITableProps {
  rows: ITableRow[];
}

export const Table: FC<ITableProps> = ({ rows }) => {
  const productsIds = useStore(productsModel.$productsIds);
  return (
    <TableContainer component={Paper}>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <MaterialTableRow>
            {columns.map((column) => (
              <TableCell sx={{ fontWeight: 'bold' }} key={column.headerName} align={column.align}>
                {column.headerName}
              </TableCell>
            ))}
          </MaterialTableRow>
        </TableHead>
        <TableBody>
          {productsIds.map((productId, index) => (
            <TableRow key={productId} row={rows.find((row) => row.id === productId)! ?? {}} index={index} />
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
