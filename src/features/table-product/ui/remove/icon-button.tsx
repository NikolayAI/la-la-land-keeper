import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';

import { IRemoveProductToTableParams } from '@/shared';
import { remove } from '../../model/remove';

interface IIconButtonProps extends IRemoveProductToTableParams {}

export const IconBtn: FC<IIconButtonProps> = ({ tableId, productId }) => (
  <IconButton
    role="remove-table-product-button"
    color="primary"
    size="small"
    onClick={() => {
      remove({ tableId, productId });
    }}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
);
