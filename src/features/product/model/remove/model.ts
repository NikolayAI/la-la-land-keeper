import { combine, createEvent, createStore, sample } from 'effector';

import { IRemoveProductParams } from '@/shared';
import { productsModel } from '@/entities/products';

export const removeProduct = createEvent<IRemoveProductParams>();
export const setRemoveAnchorEl = createEvent<null | HTMLElement>();

export const $isLoading = createStore<boolean>(false);
export const $anchorEl = createStore<null | HTMLElement>(null);

$isLoading.on(
  combine(productsModel.removeProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$anchorEl.on(setRemoveAnchorEl, (_, data) => data);

sample({
  clock: removeProduct,
  target: productsModel.removeProductFx,
});
