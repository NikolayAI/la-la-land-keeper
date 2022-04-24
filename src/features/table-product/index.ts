import { add } from './model/add';
import { decrease } from './model/decrease';
import { increase } from './model/increase';
import { remove } from './model/remove';
import * as Add from './ui/add';
import * as Decrease from './ui/decrease';
import * as Increase from './ui/increase';
import * as Remove from './ui/remove';

export const tableProductModel = {
  add,
  increase,
  decrease,
  remove,
};

export const TableProductUI = {
  Add,
  Increase,
  Decrease,
  Remove,
};
