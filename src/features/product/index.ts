import {
  $isLoading as $isCreateLoading,
  $isModalOpen,
  $product,
  closeModal,
  create,
  openCreateForm,
  setProperty,
} from './model/create';
import { $isLoading as $isRemoveLoading, removeProduct, setRemoveAnchorEl } from './model/remove';
import * as Create from './ui/create';
import * as Remove from './ui/remove';

export const productModel = {
  setProperty,
  $product,
  create,
  openCreateForm,
  closeModal,
  $isModalOpen,
  removeProduct,
  setRemoveAnchorEl,
  $isCreateLoading,
  $isRemoveLoading,
};

export const ProductUI = {
  Create,
  Remove,
};
