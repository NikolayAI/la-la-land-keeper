import { createEvent, forward } from 'effector';

import { tablesModel } from '../../../entities/tables';
import { IDecreaseTableProductParams } from '../../../shared/api';

export const decreaseTableProduct = createEvent<IDecreaseTableProductParams>();

forward({
  from: decreaseTableProduct,
  to: tablesModel.decreaseTableProductFx,
});