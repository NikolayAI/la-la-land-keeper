import { createRoute } from 'atomic-router';
import { sample } from 'effector';

import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';

export const tablesRoute = createRoute();

sample({
  source: tablesRoute.$isOpened,
  filter: tablesRoute.$isOpened,
  target: [productsModel.getProductsFx, tablesModel.getTablesFx],
});
