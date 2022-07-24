import { createRoute } from 'atomic-router';
import { sample } from 'effector';

import { productsModel } from '@/entities/products';

export const productsRoute = createRoute();

sample({
  clock: productsRoute.$isOpened,
  filter: productsRoute.$isOpened,
  target: productsModel.getProductsFx,
});
