import TableCell from '@mui/material/TableCell';
import { useStore } from 'effector-react';
import React, { FC, ReactNode } from 'react';

import { DndItems, IProduct, SpreadSheetBase, useSortableDnd } from '@/shared';
import { columns, productsModel, ProductsUI } from '@/entities/products';
import { productModel } from '@/features/product';

import { $productsTableRows } from './model';

interface ISpreadSheetRow extends IProduct {
  actions: ReactNode[];
}

interface ISpreadSheetRowProps {
  row: ISpreadSheetRow;
  index: number;
}

export const SpreadSheetRow: FC<ISpreadSheetRowProps> = ({ row, index }) => {
  const { ref, handlerId, opacity } = useSortableDnd<ISpreadSheetRowProps, HTMLTableRowElement>({
    itemId: row?.id,
    itemIndex: index,
    itemTargetType: DndItems.productsSpreadSheetRow,
    onDragDataHandler: productModel.dragAndDrop,
  });

  return <ProductsUI.SpreadSheetRow tableRowRef={ref} row={row} style={{ opacity }} data-handler-id={handlerId} />;
};

export const ProductsSpreadsheet: FC = () => {
  const rows = useStore($productsTableRows);
  const productsIds = useStore(productsModel.$productsIds);
  return (
    <SpreadSheetBase
      HeadSlot={columns.map((column) => (
        <TableCell sx={{ fontWeight: 'bold' }} key={column.headerName} align={column.align}>
          {column.headerName}
        </TableCell>
      ))}
      BodySlot={productsIds.map((productId, index) => (
        <SpreadSheetRow key={productId} row={rows[productId]} index={index} />
      ))}
    />
  );
};
