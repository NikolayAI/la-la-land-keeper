import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC, memo, ReactNode } from 'react';

import { ProductsType, TablesType } from 'shared/api';
import { productsModel } from 'entities/products';
import { tablesModel } from 'entities/tables';
import { ClearTableUI, RemoveTableUI, SetTableTitleUI } from 'features/table';
import { AddProductToTable } from 'features/tableProduct';
import { ProductCard } from '../productCard';
import { calculateTableTotalPrice } from './lib';

interface ITable {
  tableId: string;
  tables: TablesType;
  products: ProductsType;
  SetTableTitleSlot: ReactNode;
  ClearTableSlot: ReactNode;
  RemoveTableSlot: ReactNode;
}

export const Table: FC<ITable> = memo(
  ({
    tableId,
    tables,
    products,
    SetTableTitleSlot,
    ClearTableSlot,
    RemoveTableSlot,
  }) => {
    const { products: tableProducts } = tables?.[tableId] ?? {};
    return (
      <Card key={tableId} sx={{ width: 575, margin: 2 }} elevation={6}>
        <CardContent>
          <Box sx={{ flexGrow: 1, borderRadius: 16, marginBottom: 1 }}>
            <AppBar position="static" sx={{ borderRadius: 1 }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {SetTableTitleSlot}
                </Typography>
                <AddProductToTable products={products} tableId={tableId} />
              </Toolbar>
            </AppBar>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 'auto',
              },
            }}
          >
            {Object.keys(tableProducts).map((productId) => (
              <ProductCard
                tables={tables}
                key={productId}
                tableId={tableId}
                tableProduct={tableProducts[productId] ?? {}}
                timerStatus={tableProducts[productId].timerStatus}
              />
            ))}
            <Paper elevation={0}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography
                    variant="h6"
                    component="div"
                    paddingTop={1}
                    paddingBottom={1}
                  >
                    Итого:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="h6"
                    component="div"
                    paddingTop={1}
                    paddingBottom={1}
                  >
                    {calculateTableTotalPrice({ products: tableProducts })}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {RemoveTableSlot}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  {ClearTableSlot}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

export const TablesList: React.FC = () => {
  const tables = useStore(tablesModel.$tables);
  const tablesIds = useStore(tablesModel.$tablesIds);
  const products = useStore(productsModel.$products);
  return (
    <Grid container spacing={0}>
      {tablesIds.map((tableId) => {
        const { title } = tables?.[tableId] ?? {};
        return (
          <Table
            key={tableId}
            tableId={tableId}
            tables={tables}
            products={products}
            SetTableTitleSlot={
              <SetTableTitleUI.Field tableId={tableId} tableTitle={title} />
            }
            ClearTableSlot={<ClearTableUI.Btn tableId={tableId} />}
            RemoveTableSlot={<RemoveTableUI.Btn tableId={tableId} />}
          />
        );
      })}
    </Grid>
  );
};
