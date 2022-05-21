import { clear, $isLoading as $isClearLoading } from './model/clear';
import { create, $isLoading as $isCreateLoading } from './model/create';
import { remove, $isLoading as $isRemoveLoading } from './model/remove';
import { setName, $isLoading as $isSetNameLoading } from './model/setName';
import * as Clear from './ui/clear';
import * as Create from './ui/create';
import * as Remove from './ui/remove';
import * as SetName from './ui/setName';

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
  Clear,
  Create,
  Remove,
  SetName,
};
