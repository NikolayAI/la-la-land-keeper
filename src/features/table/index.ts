import { clear, $isLoading as $isClearLoading } from './model/clear';
import { create, $isLoading as $isCreateLoading } from './model/create';
import { remove, $isLoading as $isRemoveLoading } from './model/remove';
import { setName, $isLoading as $isSetNameLoading } from './model/setName';
import { Btn as ClearBtn } from './ui/clear';
import { Btn as CreateBtn } from './ui/create';
import { Btn as RemoveBtn } from './ui/remove';
import { Field as SetNameField } from './ui/setName';

export const tableModel = {
  clear,
  $isClearLoading,
  create,
  $isCreateLoading,
  remove,
  $isRemoveLoading,
  setName,
  $isSetNameLoading,
};

export const TableUI = {
  ClearBtn,
  CreateBtn,
  RemoveBtn,
  SetNameField,
};
