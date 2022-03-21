import { createEvent, forward } from 'effector';

import { tablesModel } from '../../../entities/tables';
import { IIncreaseTableProductParams } from '../../../shared/api';

export const increaseTableProduct = createEvent<IIncreaseTableProductParams>();

forward({
  from: increaseTableProduct,
  to: tablesModel.increaseTableProductFx,
});