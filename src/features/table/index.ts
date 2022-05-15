import { clear } from './model/clear';
import { create } from './model/create';
import { remove } from './model/remove';
import { setName } from './model/setName';
import * as Clear from './ui/clear';
import * as Create from './ui/create';
import * as Remove from './ui/remove';
import * as SetName from './ui/setName';

export const tableModel = {
  clear,
  create,
  remove,
  setName,
};

export const TableUI = {
  Clear,
  Create,
  Remove,
  SetName,
};
