import { createEvent, createStore, sample } from 'effector';

import { IRemoveProductParams, ProductsLoadingType } from '@/shared';
import { productsModel } from '@/entities/products';

export const removeProduct = createEvent<IRemoveProductParams>();
export const setRemoveAnchorEl = createEvent<null | HTMLElement>();

export const $isLoading = createStore<ProductsLoadingType>({});
export const $anchorEl = createStore<null | HTMLElement>(null);

$isLoading
  .on(productsModel.removeProductFx.finally, (state, { params: { productId } }) => ({
    ...state,
    [productId]: false,
  }))
  .on(productsModel.removeProductFx, (state, { productId }) => ({
    ...state,
    [productId]: true,
  }));
$anchorEl.on(setRemoveAnchorEl, (_, data) => data);

sample({
  clock: removeProduct,
  target: productsModel.removeProductFx,
});
