import React from 'react';import Menu from '@mui/material/Menu';import MenuItem from '@mui/material/MenuItem';import AddIcon from '@mui/icons-material/Add';import { Box, IconButton } from '@mui/material';import { useStore } from 'effector-react';import { $anchorEl, addProductToTable, setAnchorEl } from './model';import { productsModel } from '../../../entities/products';import { IAddProductToTableParams } from '../../../shared/api';export const AddProductToTable: React.FC<Pick<IAddProductToTableParams, 'tableId'>> = ({ tableId }) => {  const products = useStore(productsModel.$products);  const anchorEl = useStore($anchorEl);  const open = Boolean(anchorEl);  const handleAddProduct = ({ tableId, productId }: IAddProductToTableParams) => {    addProductToTable({ tableId, productId });    setAnchorEl(null);  };  return (    <div>      <IconButton        color="inherit"        onClick={(event) => setAnchorEl(event.currentTarget)}      >        <AddIcon />      </IconButton>      <Menu        id="basic-menu"        anchorEl={anchorEl}        open={open}        onClose={() => setAnchorEl(null)}        MenuListProps={{          'aria-labelledby': 'basic-button',        }}      >        {          Object.keys(products).map((productId) => (            <MenuItem              key={productId}              onClick={() => {                handleAddProduct({ tableId, productId });              }}            >              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>                <span>{products[productId]?.title}</span>                <Box sx={{marginLeft: 4}}>                  <span>{products[productId]?.price} ₽</span>                </Box>              </Box>            </MenuItem>          ))        }      </Menu>    </div>  );};