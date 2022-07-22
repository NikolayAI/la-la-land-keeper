import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useUnit } from 'effector-react';
import React from 'react';

import { productModel, ProductUI } from '@/features/product';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const ProductsPage = () => {
  // const products = useUnit(productsModel.$products);
  return (
    <>
      <LoadingButton
        sx={{ marginRight: '1rem' }}
        role="open-create-product-form-header-button"
        variant="contained"
        loading={useUnit(productModel.$isCreateLoading)}
        onClick={() => {
          productModel.openCreateForm();
        }}
      >
        Создать товар
      </LoadingButton>
      <LoadingButton
        role="open-remove-product-form-button"
        variant="contained"
        loading={useUnit(productModel.$isRemoveLoading)}
        onClick={(event) => {
          productModel.setRemoveAnchorEl(event.currentTarget);
        }}
      >
        Удалить товар
      </LoadingButton>
      <ProductUI.RemoveMenu />
      <ProductUI.CreateModal />
      <Box sx={{ height: 400, width: '100%', marginTop: '1.5rem' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};
