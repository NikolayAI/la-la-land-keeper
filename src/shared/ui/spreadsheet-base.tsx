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
  className?: string;
}

export const SpreadSheetBase: FC<IBaseSpreadSheetProps> = ({ HeadSlot, BodySlot, className }) => {
  return (
    <TableContainer className={`spreadsheet-base-container ${className}`} component={Paper}>
      <MaterialTable className="spreadsheet-base" sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead className="spreadsheet-base__head">
          <MaterialTableRow className="spreadsheet-base__row">{HeadSlot}</MaterialTableRow>
        </TableHead>
        <TableBody className="spreadsheet-base__body">{BodySlot}</TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
