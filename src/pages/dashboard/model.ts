import { forward } from 'effector';
import { createGate } from 'effector-react';

import { productsModel } from '../../entities/products';
import { tablesModel } from '../../entities/tables';

export const DashBoardGate = createGate()

forward({
  from: DashBoardGate.open,
  to: [
    productsModel.getProductsFx,
    tablesModel.getTablesFx,
  ],
})