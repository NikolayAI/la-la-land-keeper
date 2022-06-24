import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType, TablesType } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { TableUI } from '@/features/table';
import { TableProductUI, tableProductModel } from '@/features/table-product';

import { ProductCardList } from '../product-card';

interface ITableProps {
  tables: TablesType;
  tableId: TableIdType;
}

export const Table: FC<ITableProps> = ({ tables, tableId }) => (
  <TablesUI.Table
    key={tableId}
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
);

export const TablesList: FC = () => {
  const tables = useStore(tablesModel.$tables);
  const tablesIds = useStore(tablesModel.$tablesIds);
  return (
    <Grid container spacing={0}>
      {tablesIds.map((tableId) => (
        <Table key={tableId} tables={tables} tableId={tableId} />
      ))}
    </Grid>
  );
};
