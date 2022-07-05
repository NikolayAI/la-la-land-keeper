import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType, TablesType, useSortableDnd } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { tableModel, TableUI } from '@/features/table';
import { tableProductModel, TableProductUI } from '@/features/table-product';

import { ProductCardList } from '../product-card';

interface ITableProps {
  tables: TablesType;
  tableId: TableIdType;
  index: number;
}

export const Table: FC<ITableProps> = ({ tables, tableId, index }) => {
  const { ref, handlerId, opacity } = useSortableDnd<ITableProps, HTMLDivElement>({
    itemId: tableId,
    itemIndex: index,
    itemTargetType: 'table',
    itemFnReturnIdPropertyName: 'tableId',
    itemFnReturnIndexPropertyName: 'index',
    onDragDataHandler: tableModel.dragAndDrop,
  });

  return (
    <div ref={ref} key={tableId} style={{ opacity }} data-handler-id={handlerId}>
      <TablesUI.Table
        tableId={tableId}
        tables={tables}
        SetTableNameSlot={<TableUI.SetNameField tableId={tableId} tableName={tables?.[tableId]?.name} />}
        ClearTableSlot={<TableUI.ClearBtn tableId={tableId} />}
        RemoveTableSlot={<TableUI.RemoveBtn tableId={tableId} />}
        AddProductToTableSlot={
          <>
            <IconButton
              role={`add-product-to-table-button-${tableId}`}
              color="inherit"
              disabled={useStore(tableProductModel.$isAddLoading)?.[tableId]}
              onClick={(event) =>
                tableProductModel.setAddAnchorEl({
                  tableId,
                  element: event.currentTarget,
                })
              }
            >
              <AddIcon />
            </IconButton>
            <TableProductUI.AddMenu tableId={tableId} />
          </>
        }
        ProductCardListSlot={<ProductCardList products={tables?.[tableId]?.products} tableId={tableId} />}
      />
    </div>
  );
};

export const TablesList: FC = () => {
  const tables = useStore(tablesModel.$tables);
  const tablesIds = useStore(tablesModel.$tablesIds);
  return (
    <Grid container spacing={0}>
      {tablesIds.map((tableId, index) => (
        <Table key={tableId} tables={tables} tableId={tableId} index={index} />
      ))}
    </Grid>
  );
};
