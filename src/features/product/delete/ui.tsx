import DeleteIcon from '@mui/icons-material/Delete';
import { alpha, Box, Button, MenuItem } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu/Menu';
import { styled } from '@mui/material/styles';
import { useStore } from 'effector-react';
import React from 'react';

import { ProductsType } from 'shared/api';
import { $anchorEl, deleteProduct, setAnchorEl } from './model';

interface IDeleteProductsList {
  products: ProductsType;
}

export const DeleteProduct: React.FC<IDeleteProductsList> = ({ products }) => {
  const anchorEl = useStore($anchorEl);

  const open = Boolean(anchorEl);

  const handleDelete = (productId: string) => {
    deleteProduct({ id: productId });
    setAnchorEl(null);
  };

  return (
    <>
      {Object.keys(products).length ? (
        <Button
          variant="contained"
          sx={{
            my: 2,
            color: 'white',
            display: 'block',
            border: '1px solid white',
            marginRight: 4,
          }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          Удалить товар
        </Button>
      ) : null}
      <StyledMenu
        id="demo-customized-menu"
        title="demo-customized-button"
        MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(products).map((productId) => (
          <MenuItem key={productId} disableRipple>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center' }}
                role="delete-product-box"
                onClick={() => handleDelete(productId)}
              >
                <DeleteIcon />
                <span>{products[productId]?.title}</span>
              </Box>
              <Box sx={{ marginLeft: 4 }}>
                <span>{products[productId]?.price} ₽</span>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
