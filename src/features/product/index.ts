import {
  $isLoading as $isCreateLoading,
  $isModalOpen,
  $product,
  closeCreateForm,
  create,
  openCreateForm,
  setProperty,
} from './model/create';
import { dragAndDrop } from './model/drad-and-drop';
import { $isLoading as $isRemoveLoading, removeProduct, setRemoveAnchorEl } from './model/remove';
import { Modal as CreateModal } from './ui/create';
import { Menu as RemoveMenu } from './ui/remove';

export const productModel = {
  setProperty,
  $product,
  create,
  openCreateForm,
  closeModal: closeCreateForm,
  $isModalOpen,
  removeProduct,
  setRemoveAnchorEl,
  $isCreateLoading,
  $isRemoveLoading,
  dragAndDrop,
};

export const ProductUI = {
  CreateModal,
  RemoveMenu,
};
