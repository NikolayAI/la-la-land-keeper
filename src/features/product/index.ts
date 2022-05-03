import { openModal, closeModal, $isModalOpen, create } from './model/create';
import { removeProduct, setAnchorEl, $anchorEl } from './model/remove';
import * as Create from './ui/create';
import * as Remove from './ui/remove';

export const productModel = {
  create,
  openModal,
  closeModal,
  $isModalOpen,
  removeProduct,
  setAnchorEl,
  $anchorEl,
};

export const ProductUI = {
  Create,
  Remove,
};
