import { Box } from '@mui/material';
import MaterialMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import { IAddProductToTableParams } from '@/shared';
import { productsModel } from '@/entities/products';

import { $anchorEl, add, setAnchorEl } from '../../model/add';

interface IAddProductToTableProps extends Omit<IAddProductToTableParams, 'productId'> {}

export const Menu: FC<IAddProductToTableProps> = ({ tableId }) => {
  const products = useUnit(productsModel.$products);
  const anchorEl = useUnit($anchorEl)[tableId];

  const open = Boolean(anchorEl);

  const handleAddProduct = ({ tableId, productId }: IAddProductToTableParams) => {
    add({ tableId, productId });
    setAnchorEl({ tableId, element: null });
  };

  return (
    <MaterialMenu
      key={tableId}
      id={`basic-menu-${tableId}`}
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        setAnchorEl({ tableId, element: null });
      }}
      MenuListProps={{ 'aria-labelledby': `basic-button-${tableId}` }}
    >
      {Object.keys(products).map((productId) => (
        <MenuItem
          key={productId}
          role={`add-product-to-table-menu-item-${tableId}`}
          onClick={() => {
            handleAddProduct({ tableId, productId });
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <span>{products[productId]?.name}</span>
            <Box sx={{ marginLeft: 4 }}>
              <span>{products[productId]?.price} ₽</span>
            </Box>
          </Box>
        </MenuItem>
      ))}
    </MaterialMenu>
  );
};
