import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useStore } from 'effector-react';

import { calculateTableTotalPrice } from './lib';
import { ProductCard } from '../productCard';
import { clearTable, deleteTable, setTableTitle } from 'features/table';
import { AddProductToTable } from 'features/tableProduct';
import { productsModel } from 'entities/products';
import { tablesModel } from 'entities/tables';
import { ProductsType, TablesType } from 'shared/api';
import { EditableText } from 'shared/ui';

interface ITable {
  tableId: string;
  tables: TablesType;
  products: ProductsType;
}

export const Table: React.FC<ITable> = React.memo(
  ({ tableId, tables, products }) => {
    const { title, products: tableProducts } = tables[tableId] ?? {};
    return (
      <Card key={tableId} sx={{ width: 575, margin: 2 }} elevation={6}>
        <CardContent>
          <Box sx={{ flexGrow: 1, borderRadius: 16, marginBottom: 1 }}>
            <AppBar position="static" sx={{ borderRadius: 1 }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <EditableText
                    role={`editable-table-title-${tableId}`}
                    text={title}
                    setTableTitle={(text: string) => {
                      setTableTitle({ id: tableId, text });
                    }}
                  />
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
                  <Button
                    role={`delete-table-${tableId}-button`}
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteTable({ id: tableId })}
                  >
                    Удалить стол
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <Button
                    role={`clear-table-${tableId}-button`}
                    variant="contained"
                    startIcon={<CleaningServicesIcon />}
                    onClick={() => {
                      clearTable({ tableId });
                    }}
                  >
                    Очистить стол
                  </Button>
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
      {tablesIds.length > 0 &&
        tablesIds.map((tableId) => (
          <Table
            key={tableId}
            tableId={tableId}
            tables={tables}
            products={products}
          />
        ))}
    </Grid>
  );
};
