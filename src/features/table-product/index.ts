import {
  $anchorEl as $addAnchorEl,
  $isLoading as $isAddLoading,
  add,
  setAnchorEl as setAddAnchorEl,
} from './model/add';
import { decrease, $isLoading as $isDecreaseLoading } from './model/decrease';
import { increase } from './model/increase';
import { remove, $isLoading as $isRemoveLoading } from './model/remove';
import { Menu as AddMenu } from './ui/add';
import { IconBtn as DecreaseIconBtn } from './ui/decrease';
import { IconBtn as IncreaseIconBtn } from './ui/increase';
import { IconBtn as RemoveIconBtn } from './ui/remove';

export const tableProductModel = {
  add,
  setAddAnchorEl,
  $addAnchorEl,
  $isAddLoading,
  increase,
  decrease,
  $isDecreaseLoading,
  remove,
  $isRemoveLoading,
};

export const TableProductUI = {
  AddMenu,
  IncreaseIconBtn,
  DecreaseIconBtn,
  RemoveIconBtn,
};
