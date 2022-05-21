import LoadingButton from '@mui/lab/LoadingButton';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';

import { productModel, ProductUI } from '@/features/product';
import { TableUI } from '@/features/table';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              '& button': { marginRight: '1rem', border: '1px solid #fff' },
            }}
          >
            <TableUI.Create.Btn />
            <LoadingButton
              role="open-create-product-form-header-button"
              variant="contained"
              loading={useStore(productModel.$isCreateLoading)}
              onClick={() => {
                productModel.openCreateForm();
              }}
            >
              Создать товар
            </LoadingButton>
            <LoadingButton
              role="open-remove-product-form-header-button"
              variant="contained"
              loading={useStore(productModel.$isRemoveLoading)}
              onClick={(event) => {
                productModel.setRemoveAnchorEl(event.currentTarget);
              }}
            >
              Удалить товар
            </LoadingButton>
            <ProductUI.Remove.Menu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
