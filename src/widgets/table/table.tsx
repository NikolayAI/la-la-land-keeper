import { Grid } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TableIdType, TablesType } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { TableUI } from '@/features/table';
import { TableProductUI } from '@/features/table-product';
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
    SetTableNameSlot={<TableUI.SetName.Field tableId={tableId} tableName={tables?.[tableId]?.name ?? ''} />}
    ClearTableSlot={<TableUI.Clear.Btn tableId={tableId} />}
    RemoveTableSlot={<TableUI.Remove.Btn tableId={tableId} />}
    AddProductToTableSlot={<TableProductUI.Add.IconBtn tableId={tableId} />}
    ProductCardListSlot={<ProductCardList tables={tables} tableId={tableId} />}
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
