import { createEvent, forward } from 'effector';
import { tablesModel } from '../../../entities/tables';

export const createTable = createEvent();

forward({
  from: createTable,
  to: tablesModel.createTableFx,
})