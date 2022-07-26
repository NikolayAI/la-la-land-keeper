import { sample } from 'effector';

import { tablesRoute } from '@/shared';
import { productsModel } from '@/entities/products';
import { tablesModel } from '@/entities/tables';

sample({
  source: tablesRoute.$isOpened,
  filter: tablesRoute.$isOpened,
  target: [productsModel.getProductsFx, tablesModel.getTablesFx],
});
