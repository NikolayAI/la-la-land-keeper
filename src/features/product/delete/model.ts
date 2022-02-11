import { createEvent, createStore, forward } from 'effector';import { productsModel } from '../../../entities/products';export const deleteProduct = createEvent<{ id: string }>();export const openDeleteProductForm = createEvent<HTMLElement>();export const closeDeleteProductForm = createEvent<null>();export const $anchorEl = createStore<null | HTMLElement>(null);forward({  from: [    openDeleteProductForm,    closeDeleteProductForm,  ],  to: $anchorEl,})forward({  from: deleteProduct,  to: productsModel.deleteProductFx,});