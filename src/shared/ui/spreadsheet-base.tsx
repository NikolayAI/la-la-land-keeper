import Paper from '@mui/material/Paper';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MaterialTableRow from '@mui/material/TableRow';
import React, { FC, ReactNode } from 'react';

interface IBaseSpreadSheetProps {
  /**
   * Should be valid <tr> children such as `TableCell`.
   */
  HeadSlot: ReactNode;
  /**
   * The content of the HeadSlot component, normally `TableRow`.
   */
  BodySlot: ReactNode;
}

export const SpreadSheetBase: FC<IBaseSpreadSheetProps> = ({ HeadSlot, BodySlot }) => {
  return (
    <TableContainer component={Paper}>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <MaterialTableRow>{HeadSlot}</MaterialTableRow>
        </TableHead>
        <TableBody>{BodySlot}</TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
