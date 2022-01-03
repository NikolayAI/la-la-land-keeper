import React from 'react';import { useStore } from 'effector-react';import { Grid, IconButton, Paper, Typography } from '@mui/material';import DeleteIcon from '@mui/icons-material/Delete';import RemoveIcon from '@mui/icons-material/Remove';import AddIcon from '@mui/icons-material/Add';import { deleteProductFromTable } from '../../features/tableProduct/deleteProductFromTable';import { increaseTableProduct } from '../../features/tableProduct/increaseTableProduct';import { decreaseTableProduct } from '../../features/tableProduct/decreaseTableProduct';import { TableProductTimer } from '../../features/tableProduct/tableProductTimer';import { tablesModel } from '../../entities/tables';import { ITableProduct } from '../../shared/api';interface IProductCard {  tableId: string;  tableProduct: ITableProduct;}export const ProductCard: React.FC<IProductCard> = ({ tableId, tableProduct }) => {  const isTablesProductsTimersOutOfLimit = useStore(tablesModel.$isTablesProductsTimersOutOfLimits);  const changeProductParams = { tableId, productId: tableProduct.id };  const isOutOfTimer = isTablesProductsTimersOutOfLimit[tableId][tableProduct.id];  return (    <Paper elevation={6} sx={{ backgroundColor: isOutOfTimer ? 'red' : 'inherit' }}>      <Grid container spacing={2} alignItems="center">        <Grid item xs={4}>          <Typography variant="subtitle1" component="div" paddingLeft={1}>            {tableProduct.title}          </Typography>        </Grid>        <Grid item xs={3}>          {            tableProduct.needTimer              ? (                <TableProductTimer                  tableId={tableId}                  productId={tableProduct.id}                  timerCount={tableProduct.minutesTimer}                  minutesLimit={tableProduct.eachProductUnitMinutesTimer}                  productUnits={tableProduct.units}                />              ) : null          }        </Grid>        <Grid item xs={3}>          {            tableProduct.isPiece ? (              <>                <IconButton                  color="primary"                  size="small"                  onClick={() => {                    tableProduct.units > 1                      ? decreaseTableProduct(changeProductParams)                      : deleteProductFromTable(changeProductParams);                  }}                >                  <RemoveIcon fontSize="small" />                </IconButton>                <IconButton color="primary" size="small">                  {tableProduct.units}                </IconButton>                <IconButton                  color="primary"                  size="small"                  onClick={() => {                    increaseTableProduct(changeProductParams);                  }}                >                  <AddIcon fontSize="small" />                </IconButton>              </>            ) : (              <IconButton                color="primary"                size="small"                onClick={() => {                  deleteProductFromTable(changeProductParams);                }}              >                <DeleteIcon fontSize="small" />              </IconButton>            )          }        </Grid>        <Grid item xs={2}>          <Typography variant="subtitle1" component="div">            {tableProduct.price * tableProduct.units}          </Typography>        </Grid>      </Grid>    </Paper>  );};