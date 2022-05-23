import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { IRemoveProductToTableParams } from '@/shared';
import { remove, $isLoading } from '../../model/remove';

interface IIconButtonProps extends IRemoveProductToTableParams {}

export const IconBtn: FC<IIconButtonProps> = ({ tableId, productId }) => (
  <IconButton
    role={`remove-table-product-button-${tableId}-${productId}`}
    color="primary"
    size="small"
    disabled={useStore($isLoading)}
    onClick={() => {
      remove({ tableId, productId });
    }}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
);
