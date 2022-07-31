import { sample } from 'effector';

import { productsRoute } from '@/shared';
import { productsModel } from '@/entities/products';

sample({
  clock: productsRoute.$isOpened,
  filter: productsRoute.$isOpened,
  target: productsModel.getProductsFx,
});
