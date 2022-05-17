import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';

import { StyledLoadingButton } from '@/shared';
import { productModel, ProductUI } from '@/features/product';
import { TableUI } from '@/features/table';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <TableUI.Create.Btn />
            <StyledLoadingButton
              role="open-create-product-form-header-button"
              variant="contained"
              loading={useStore(productModel.$isCreateLoading)}
              onClick={() => {
                productModel.openCreateForm();
              }}
            >
              Создать товар
            </StyledLoadingButton>
            <StyledLoadingButton
              role="open-remove-product-form-header-button"
              variant="contained"
              loading={useStore(productModel.$isRemoveLoading)}
              onClick={(event) => {
                productModel.setRemoveAnchorEl(event.currentTarget);
              }}
            >
              Удалить товар
            </StyledLoadingButton>
            <ProductUI.Remove.Menu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
