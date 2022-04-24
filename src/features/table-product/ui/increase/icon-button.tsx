import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';

import { IIncreaseTableProductParams } from 'shared/api';
import { increase } from '../../model/increase';

interface IIconBtnProps extends Omit<IIncreaseTableProductParams, 'value'> {}

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
