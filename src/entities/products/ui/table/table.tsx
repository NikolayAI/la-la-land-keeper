import Paper from '@mui/material/Paper';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { FC, ReactNode } from 'react';

import { IProduct } from '@/shared';

import { columns } from './constants';

interface ITableProps {
  rows: (IProduct & { actions: ReactNode[] })[];
}

export const Table: FC<ITableProps> = ({ rows }) => (
  <TableContainer component={Paper}>
    <MaterialTable sx={{ minWidth: 650 }} aria-label="caption table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell sx={{ fontWeight: 'bold' }} key={column.headerName} align={column.align}>
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.isPiece ? 'Да' : 'Нет'}</TableCell>
            <TableCell align="right">{row.needTimer ? 'Да' : 'Нет'}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="center">{row.actions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MaterialTable>
  </TableContainer>
);
