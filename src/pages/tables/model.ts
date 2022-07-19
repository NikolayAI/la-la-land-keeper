import { createRoute } from 'atomic-router';
import { sample } from 'effector';
import { createGate } from 'effector-react';

import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';

export const tablesRoute = createRoute();

export const DashBoardGate = createGate();

sample({
  clock: DashBoardGate.open,
  target: [productsModel.getProductsFx, tablesModel.getTablesFx],
});
