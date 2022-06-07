import {
  $anchorEl as $addAnchorEl,
  $isLoading as $isAddLoading,
  add,
  setAnchorEl as setAddAnchorEl,
} from './model/add';
import { decrease, $isLoading as $isDecreaseLoading } from './model/decrease';
import { increase } from './model/increase';
import { remove } from './model/remove';
import * as Add from './ui/add';
import * as Decrease from './ui/decrease';
import * as Increase from './ui/increase';
import * as Remove from './ui/remove';

export const tableProductModel = {
  add,
  setAddAnchorEl,
  $addAnchorEl,
  $isAddLoading,
  increase,
  decrease,
  $isDecreaseLoading,
  remove,
};

export const TableProductUI = {
  Add,
  Increase,
  Decrease,
  Remove,
};
