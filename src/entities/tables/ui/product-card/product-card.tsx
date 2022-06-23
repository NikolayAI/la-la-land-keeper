import { Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { ITableProduct } from '@/shared';

import { backgroundColors } from '../../constants';

interface IProductCardProps {
  tableProduct: ITableProduct;
  isProductTimerOut: boolean;
  TableProductTimerSlot: ReactNode;
  IncreaseTableProductSlot: ReactNode;
  DecreaseTableProductSlot: ReactNode;
  RemoveTableProductSlot: ReactNode;
}

export const ProductCard: FC<IProductCardProps> = ({
  tableProduct,
  isProductTimerOut,
  TableProductTimerSlot,
  IncreaseTableProductSlot,
  DecreaseTableProductSlot,
  RemoveTableProductSlot,
}) => (
  <Paper
    role={`table-product-paper-${tableProduct.id}`}
    elevation={6}
    sx={{ backgroundColor: isProductTimerOut ? '#d32f2f' : backgroundColors[tableProduct?.timerStatus] }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3.5}>
        <Typography variant="subtitle1" component="div" paddingLeft={1}>
          {tableProduct.name}
        </Typography>
      </Grid>
      <Grid item xs={3.5}>
        {tableProduct.needTimer && TableProductTimerSlot}
      </Grid>
      <Grid item xs={3}>
        {tableProduct.isPiece ? (
          <>
            {tableProduct.units > 1 ? DecreaseTableProductSlot : RemoveTableProductSlot}
            <IconButton color="default" size="small" sx={{ cursor: 'default' }}>
              {tableProduct.units}
            </IconButton>
            {IncreaseTableProductSlot}
          </>
        ) : (
          <>{RemoveTableProductSlot}</>
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
