import TableCell from '@mui/material/TableCell';
import { useStore } from 'effector-react';
import React, { FC, ReactNode } from 'react';

import { DndItems, IProduct, SpreadSheetBase, useSortableDnd } from '@/shared';
import { columns, productsModel, ProductsUI } from '@/entities/products';
import { productModel } from '@/features/product';

import { $productsTableRows } from './model';

interface IProductsSpreadSheetRow extends IProduct {
  actions: ReactNode[];
}

interface IProductsSpreadSheetRowProps {
  row: IProductsSpreadSheetRow;
  index: number;
}

export const ProductsSpreadSheetRow: FC<IProductsSpreadSheetRowProps> = ({ row, index }) => {
  const { ref, handlerId, opacity } = useSortableDnd<IProductsSpreadSheetRowProps, HTMLTableRowElement>({
    itemId: row?.id,
    itemIndex: index,
    itemTargetType: DndItems.productsSpreadSheetRow,
    onDragDataHandler: productModel.dragAndDrop,
  });

  return <ProductsUI.SpreadSheetRow tableRowRef={ref} row={row} style={{ opacity }} data-handler-id={handlerId} />;
};

interface IProductsSpreadsheetProps {
  className?: string;
}

export const ProductsSpreadsheet: FC<IProductsSpreadsheetProps> = ({ className }) => {
  const rows = useStore($productsTableRows);
  const productsIds = useStore(productsModel.$productsIds);
  return (
    <SpreadSheetBase
      className={`products-spreadsheet ${className}`}
      HeadSlot={columns.map((column) => (
        <TableCell
          className="products-spreadsheet__cell"
          sx={{ fontWeight: 'bold' }}
          key={column.headerName}
          align={column.align}
        >
          {column.headerName}
        </TableCell>
      ))}
      BodySlot={productsIds.map((productId, index) => (
        <ProductsSpreadSheetRow key={productId} row={rows[productId]} index={index} />
      ))}
    />
  );
};
