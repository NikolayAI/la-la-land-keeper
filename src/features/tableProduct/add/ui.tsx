import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton } from '@mui/material';
import { useStore } from 'effector-react';

import { IAddProductToTableProps } from './types';
import { $anchorEl, addProductToTable, setAnchorEl } from './model';
import { IAddProductToTableParams } from 'shared/api';

export const AddProductToTable: React.FC<IAddProductToTableProps> = ({
  tableId,
  products,
}) => {
  const anchorEl = useStore($anchorEl)[tableId];

  const open = Boolean(anchorEl);

  const handleAddProduct = ({
    tableId,
    productId,
  }: IAddProductToTableParams) => {
    addProductToTable({ tableId, productId });
    setAnchorEl({ tableId, element: null });
  };

  return (
    <div>
      <IconButton
        role={`add-product-to-table-button-${tableId}`}
        color="inherit"
        onClick={(event) =>
          setAnchorEl({
            tableId,
            element: event.currentTarget,
          })
        }
      >
        <AddIcon />
      </IconButton>
      <Menu
        id={`basic-menu-${tableId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl({ tableId, element: null })}
        MenuListProps={{ 'aria-labelledby': `basic-button-${tableId}` }}
      >
        {Object.keys(products).map((productId) => (
          <MenuItem
            key={productId}
            role="add-product-to-table-menu-item"
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
              <span>{products[productId]?.title}</span>
              <Box sx={{ marginLeft: 4 }}>
                <span>{products[productId]?.price} ₽</span>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
