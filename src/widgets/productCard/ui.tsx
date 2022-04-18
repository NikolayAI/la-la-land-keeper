import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import {
  ITableProduct,
  TableProductTimerStatuses,
  TablesType,
} from 'shared/api';
import { tablesModel } from 'entities/tables';
import {
  decreaseTableProduct,
  deleteProductFromTable,
  increaseTableProduct,
} from 'features/tableProduct';
import {
  playTableProductTimer,
  stopTableProductTimer,
  TableProductTimer,
} from 'features/tableProductTimer';
import { backgroundColors } from './constants';

interface IProductCard {
  tables: TablesType;
  tableId: string;
  tableProduct: ITableProduct;
  timerStatus: TableProductTimerStatuses;
}

export const ProductCard: FC<IProductCard> = ({
  tables,
  tableId,
  tableProduct,
  timerStatus,
}) => {
  const tablesProductsTimersOutOfLimit = useStore(
    tablesModel.$tablesProductsTimersOutOfLimits
  );
  const changeProductParams = { tableId, productId: tableProduct?.id };
  const isOutOfTimer =
    tablesProductsTimersOutOfLimit[tableId]?.[tableProduct?.id];
  return (
    <Paper
      elevation={6}
      sx={{
        backgroundColor: isOutOfTimer
          ? '#d32f2f'
          : backgroundColors[timerStatus],
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3.5}>
          <Typography variant="subtitle1" component="div" paddingLeft={1}>
            {tableProduct.title}
          </Typography>
        </Grid>
        <Grid item xs={3.5}>
          {tableProduct.needTimer && (
            <TableProductTimer
              tables={tables}
              tableId={tableId}
              productId={tableProduct.id}
              createdAt={tableProduct.createdAt}
              minutesLimit={tableProduct.eachProductUnitMinutesTimer}
              productUnits={tableProduct.units}
              setTimer={tablesModel.setTablesProductsTimers}
              handleStopTimer={stopTableProductTimer}
              handlePlayTimer={playTableProductTimer}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          {tableProduct.isPiece ? (
            <>
              <IconButton
                role="decrease-table-product-count-button"
                color="primary"
                size="small"
                onClick={() => {
                  tableProduct.units > 1
                    ? decreaseTableProduct(changeProductParams)
                    : deleteProductFromTable(changeProductParams);
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="default"
                size="small"
                sx={{ cursor: 'default' }}
              >
                {tableProduct.units}
              </IconButton>
              <IconButton
                role="increase-table-product-count-button"
                color="primary"
                size="small"
                onClick={() => {
                  increaseTableProduct(changeProductParams);
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <IconButton
              role="delete-table-product-button"
              color="primary"
              size="small"
              onClick={() => {
                deleteProductFromTable(changeProductParams);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" component="div">
            {tableProduct.price * tableProduct.units}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

interface IProductCardListProps {
  tables: TablesType;
  tableId: string;
}

export const ProductCardList: FC<IProductCardListProps> = ({
  tables,
  tableId,
}) => {
  const { products } = tables?.[tableId] ?? {};
  return (
    <>
      {Object.keys(products).map((productId) => (
        <ProductCard
          tables={tables}
          key={productId}
          tableId={tableId}
          tableProduct={products[productId] ?? {}}
          timerStatus={products[productId]?.timerStatus}
        />
      ))}
    </>
  );
};
