import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableCellProps } from '@mui/material/TableCell/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useStore } from 'effector-react';
import React from 'react';

import { productsModel } from '@/entities/products';
import { productModel, ProductUI } from '@/features/product';

const columns: (TableCellProps & { headerName: string })[] = [
  { headerName: 'Название' },
  { headerName: 'Штучный', align: 'right' },
  { headerName: 'Таймер', align: 'right' },
  { headerName: 'Цена/1шт', align: 'right' },
  { headerName: 'Действия', align: 'center' },
];

const ProductsTable = ({ rows }: { rows: any[] }) => {
  return (
    <TableContainer sx={{ marginTop: '1.5rem' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.headerName} align={column.align}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.isPiece ? 'true' : 'false'}</TableCell>
              <TableCell align="right">{row.needTimer ? 'true' : 'false'}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ProductsPage = () => {
  const products = useStore(productsModel.$products);
  const isRemoveLoading = useStore(productModel.$isRemoveLoading);

  const rows = Object.values(products).map((product) => ({
    ...product,
    actions: [
      <LoadingButton
        key={`remove-${product.id}`}
        role="open-remove-product-form-button"
        variant="contained"
        loading={isRemoveLoading}
        onClick={(event) => {
          productModel.setRemoveAnchorEl(event.currentTarget);
        }}
      >
        Удалить
      </LoadingButton>,
      <ProductUI.RemoveMenu key={`remove-menu-${product.id}`} />,
    ],
  }));

  return (
    <>
      <LoadingButton
        sx={{ marginRight: '1rem' }}
        role="open-create-product-form-button"
        variant="contained"
        loading={useStore(productModel.$isCreateLoading)}
        onClick={() => {
          productModel.openCreateForm();
        }}
      >
        Создать товар
      </LoadingButton>
      <ProductsTable rows={rows} />
      <ProductUI.CreateModal />
    </>
  );
};
