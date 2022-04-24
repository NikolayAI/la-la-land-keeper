import { clear } from './model/clear';
import { create } from './model/create';
import { remove } from './model/remove';
import { setTitle } from './model/setTitle';
import * as Clear from './ui/clear';
import * as Create from './ui/create';
import * as Remove from './ui/remove';
import * as SetTitle from './ui/setTitle';

export const tableModel = {
  clear,
  create,
  remove,
  setTitle,
};

export const TableUI = {
  Clear,
  Create,
  Remove,
  SetTitle,
};
