import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';

import { IDecreaseTableProductParams, TableProductUnitsType } from '@/shared';
import { decrease } from '../../model/decrease';
import { remove } from '../../model/remove';

interface IIconBtnProps extends Omit<IDecreaseTableProductParams, 'value'> {
  productUnits: TableProductUnitsType;
}

export const IconBtn: FC<IIconBtnProps> = ({ tableId, productId, productUnits }) => (
  <IconButton
    role="decrease-table-product-count-button"
    color="primary"
    size="small"
    onClick={() => {
      productUnits > 1
        ? decrease({ tableId, productId })
        : remove({
            tableId,
            productId,
          });
    }}
  >
    <RemoveIcon fontSize="small" />
  </IconButton>
);
