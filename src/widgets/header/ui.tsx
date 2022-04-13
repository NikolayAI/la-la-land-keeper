import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useStore } from 'effector-react';
import React from 'react';

import { productsModel } from 'entities/products';
import { DeleteProduct, openCreateProductModal } from 'features/product';
import { createTable } from 'features/table';

export const Header = () => {
  const products = useStore(productsModel.$products);
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              role="create-table-header-button"
              variant="contained"
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                border: '1px solid white',
                marginRight: 4,
              }}
              onClick={() => createTable()}
            >
              Создать стол
            </Button>
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
              onClick={() => openCreateProductModal()}
            >
              Создать товар
            </Button>
            <DeleteProduct products={products} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
