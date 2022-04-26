import { openModal, closeModal, $isModalOpen, create } from './model/create';
import * as Create from './ui/create';
import * as Remove from './ui/remove';

export const productModel = {
  create,
  openModal,
  closeModal,
  $isModalOpen,
};

export const ProductUI = {
  Create,
  Remove,
};
