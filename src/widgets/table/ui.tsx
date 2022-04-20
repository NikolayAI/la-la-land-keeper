import { Grid } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { TablesType } from 'shared/api';
import { tablesModel, TablesUI } from 'entities/tables';
import { ClearTableUI, RemoveTableUI, SetTableTitleUI } from 'features/table';
import { AddTableProductUI } from 'features/tableProduct';
import { ProductCardList } from '../productCard';

interface ITableProps {
  tables: TablesType;
  tableId: string;
}

export const Table: FC<ITableProps> = ({ tables, tableId }) => {
  const { title } = tables?.[tableId] ?? {};
  return (
    <TablesUI.Table
      key={tableId}
      tableId={tableId}
      tables={tables}
      SetTableTitleSlot={
        <SetTableTitleUI.Field tableId={tableId} tableTitle={title} />
      }
      ClearTableSlot={<ClearTableUI.Btn tableId={tableId} />}
      RemoveTableSlot={<RemoveTableUI.Btn tableId={tableId} />}
      AddProductToTableSlot={<AddTableProductUI.IconBtn tableId={tableId} />}
      ProductCardListSlot={
        <ProductCardList tables={tables} tableId={tableId} />
      }
    />
  );
};

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
