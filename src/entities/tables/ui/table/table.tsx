import { AppBar, Box, Card, CardContent, Grid, Toolbar, Typography } from '@mui/material';
import React, { FC, memo, ReactNode } from 'react';

import { ITable } from '@/shared';

import { calculateTableTotalPrice } from '../../lib';

interface ITableProps {
  table: ITable;
  SetTableNameSlot: ReactNode;
  ClearTableSlot: ReactNode;
  RemoveTableSlot: ReactNode;
  AddProductToTableSlot: ReactNode;
  ProductCardListSlot: ReactNode;
}

export const Table: FC<ITableProps> = memo(
  ({ table, SetTableNameSlot, ClearTableSlot, RemoveTableSlot, AddProductToTableSlot, ProductCardListSlot }) => (
    <Card key={table?.id} sx={{ width: 575, margin: 2 }} elevation={6}>
      <CardContent>
        <Box sx={{ flexGrow: 1, borderRadius: 16, marginBottom: 1 }}>
          <AppBar position="static" elevation={12} sx={{ borderRadius: 1 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {SetTableNameSlot}
              </Typography>
              {AddProductToTableSlot}
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
          {ProductCardListSlot}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6" component="div" paddingTop={1} paddingBottom={1}>
                  Итого:
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" component="div" paddingTop={1} paddingBottom={1}>
                  {calculateTableTotalPrice({ products: table?.products })}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {RemoveTableSlot}
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                {ClearTableSlot}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
);
