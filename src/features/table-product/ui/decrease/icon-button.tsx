import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';

import { IDecreaseTableProductParams, TableProductUnitsType } from '@/shared';

import { decrease, $isLoading } from '../../model/decrease';

interface IIconBtnProps extends Omit<IDecreaseTableProductParams, 'value'> {
  productUnits: TableProductUnitsType;
}

export const IconBtn: FC<IIconBtnProps> = ({ tableId, productId }) => (
  <IconButton
    role={`decrease-table-product-count-button-${tableId}-${productId}`}
    color="primary"
    size="small"
    disabled={useUnit($isLoading)?.[tableId]?.[productId]}
    onClick={() => decrease({ tableId, productId })}
  >
    <RemoveIcon fontSize="small" />
  </IconButton>
);
