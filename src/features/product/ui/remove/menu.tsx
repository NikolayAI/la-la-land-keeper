import DeleteIcon from '@mui/icons-material/Delete';
import { alpha, Box, MenuItem } from '@mui/material';
import MaterialMenu, { MenuProps } from '@mui/material/Menu/Menu';
import { styled } from '@mui/material/styles';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { productsModel } from '@/entities/products';
import { $anchorEl, removeProduct, setRemoveAnchorEl } from '../../model/remove/model';

export const Menu: FC = () => {
  const products = useStore(productsModel.$products);
  const anchorEl = useStore($anchorEl);

  const open = Boolean(anchorEl);

  const handleRemove = (productId: string) => {
    removeProduct({ id: productId });
    setRemoveAnchorEl(null);
  };

  return (
    <StyledMenu
      id="demo-customized-menu"
      title="demo-customized-button"
      MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => setRemoveAnchorEl(null)}
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
              role="remove-product-box"
              onClick={() => handleRemove(productId)}
            >
              <DeleteIcon />
              <span>{products[productId]?.name}</span>
            </Box>
            <Box sx={{ marginLeft: 4 }}>
              <span>{products[productId]?.price} ₽</span>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </StyledMenu>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <MaterialMenu
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
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));
