import { add } from './model/add';
import { decrease } from './model/decrease';
import { increase } from './model/increase';
import { remove } from './model/remove';
import * as Add from './ui/add';
import * as Increase from './ui/increase';

export const tableProductModel = {
  add,
  increase,
  decrease,
  remove,
};

export const TableProductUI = {
  Add,
  Increase,
};
