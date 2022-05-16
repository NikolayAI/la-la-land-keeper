import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';

import { productModel, ProductUI } from '@/features/product';
import { TableUI } from '@/features/table';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <TableUI.Create.Btn />
            <Button
              role="open-create-product-modal-header-button"
              variant="contained"
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                border: '1px solid white',
                marginRight: 4,
              }}
              onClick={() => {
                productModel.openModal();
              }}
            >
              Создать товар
            </Button>
            <Button
              variant="contained"
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                border: '1px solid white',
                marginRight: 4,
              }}
              onClick={(event) => {
                productModel.setAnchorEl(event.currentTarget);
              }}
            >
              Удалить товар
            </Button>
            <ProductUI.Remove.Menu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
