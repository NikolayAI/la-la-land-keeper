import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';

import { increase } from '../../model/increase';

interface IIconBtnProps {
  tableId: string;
  productId: string;
}

export const IconBtn: FC<IIconBtnProps> = ({ tableId, productId }) => (
  <IconButton
    role="increase-table-product-count-button"
    color="primary"
    size="small"
    onClick={() => {
      increase({ tableId, productId });
    }}
  >
    <AddIcon fontSize="small" />
  </IconButton>
);
