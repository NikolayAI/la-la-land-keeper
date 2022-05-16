import { $isModalOpen, $product, closeModal, create, openModal, setProperty } from './model/create';
import { removeProduct, setAnchorEl } from './model/remove';
import * as Create from './ui/create';
import * as Remove from './ui/remove';

export const productModel = {
  setProperty,
  $product,
  create,
  openModal,
  closeModal,
  $isModalOpen,
  removeProduct,
  setAnchorEl,
};

export const ProductUI = {
  Create,
  Remove,
};
