import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { DndItems, ITable, useSortableDnd } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { tableModel, TableUI } from '@/features/table';
import { tableProductModel, TableProductUI } from '@/features/table-product';

import { ProductCardList } from '../product-card';

interface ITableProps {
  table: ITable;
  index: number;
  className?: string;
}

export const Table: FC<ITableProps> = ({ table, index, className }) => {
  const { ref, handlerId, opacity } = useSortableDnd<ITableProps, HTMLDivElement>({
    itemId: table?.id,
    itemIndex: index,
    itemTargetType: DndItems.table,
    onDragDataHandler: tableModel.dragAndDrop,
  });

  return (
    <div className={`table-container ${className}`} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <TablesUI.Table
        table={table}
        SetTableNameSlot={<TableUI.SetNameField tableId={table?.id} tableName={table?.name} />}
        ClearTableSlot={<TableUI.ClearBtn tableId={table?.id} />}
        RemoveTableSlot={<TableUI.RemoveBtn tableId={table?.id} />}
        AddProductToTableSlot={
          <>
            <IconButton
              role={`add-product-to-table-button-${table?.id}`}
              color="inherit"
              disabled={useStore(tableProductModel.$isAddLoading)?.[table?.id]}
              onClick={(event) =>
                tableProductModel.setAddAnchorEl({
                  tableId: table?.id,
                  element: event.currentTarget,
                })
              }
            >
              <AddIcon />
            </IconButton>
            <TableProductUI.AddMenu tableId={table?.id} />
          </>
        }
        ProductCardListSlot={<ProductCardList products={table?.products} tableId={table?.id} />}
      />
    </div>
  );
};

interface ITablesListProps {
  className?: string;
}

export const TablesList: FC<ITablesListProps> = ({ className }) => {
  const tables = useStore(tablesModel.$tables);
  const tablesIds = useStore(tablesModel.$tablesIds);
  return (
    <Grid className={`tables-list ${className}`} gap={2} container spacing={0}>
      {tablesIds.map((tableId, index) => (
        <Table className="tables-list__item" key={tableId} table={tables?.[tableId]} index={index} />
      ))}
    </Grid>
  );
};
