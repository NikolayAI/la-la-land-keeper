import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC, ReactNode } from 'react';

import {
  ITableProduct,
  TableProductTimerStatuses,
  TablesType,
} from 'shared/api';
import { tablesModel } from 'entities/tables';
import { tableProductModel, TableProductUI } from 'features/tableProduct';
import { TableProductTimerUI } from 'features/tableProductTimer';
import { backgroundColors } from './constants';

interface IProductCard {
  tableId: string;
  tableProduct: ITableProduct;
  timerStatus: TableProductTimerStatuses;
  TableProductTimerSlot: ReactNode;
  IncreaseTableProductSlot: ReactNode;
}

export const ProductCard: FC<IProductCard> = ({
  tableId,
  tableProduct,
  timerStatus,
  TableProductTimerSlot,
  IncreaseTableProductSlot,
}) => {
  const productsTimersOutOfLimit = useStore(
    tablesModel.$tablesProductsTimersOutOfLimits
  );
  const changeProductParams = { tableId, productId: tableProduct?.id };
  const isTimerOut = productsTimersOutOfLimit[tableId]?.[tableProduct?.id];
  return (
    <Paper
      elevation={6}
      sx={{
        backgroundColor: isTimerOut ? '#d32f2f' : backgroundColors[timerStatus],
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3.5}>
          <Typography variant="subtitle1" component="div" paddingLeft={1}>
            {tableProduct.title}
          </Typography>
        </Grid>
        <Grid item xs={3.5}>
          {tableProduct.needTimer && TableProductTimerSlot}
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
                    ? tableProductModel.decrease(changeProductParams)
                    : tableProductModel.remove(changeProductParams);
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
              {IncreaseTableProductSlot}
            </>
          ) : (
            <IconButton
              role="delete-table-product-button"
              color="primary"
              size="small"
              onClick={() => {
                tableProductModel.remove(changeProductParams);
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
      {Object.keys(products).map((productId) => {
        const tableProduct = products[productId] ?? {};
        return (
          <ProductCard
            key={productId}
            tableId={tableId}
            tableProduct={tableProduct}
            timerStatus={tableProduct?.timerStatus}
            TableProductTimerSlot={
              <TableProductTimerUI.Display
                tables={tables}
                tableId={tableId}
                productId={tableProduct.id}
                createdAt={tableProduct.createdAt}
                minutesLimit={tableProduct.eachProductUnitMinutesTimer}
                productUnits={tableProduct.units}
                setTimer={tablesModel.setTablesProductsTimers}
              />
            }
            IncreaseTableProductSlot={
              <TableProductUI.Increase.IconBtn
                tableId={tableId}
                productId={tableProduct.id}
              />
            }
          />
        );
      })}
    </>
  );
};
