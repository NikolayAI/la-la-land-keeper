import { combine, createEvent, createStore, forward } from 'effector';

import { productsModel } from '@/entities/products';

export const removeProduct = createEvent<{ id: string }>();
export const setRemoveAnchorEl = createEvent<null | HTMLElement>();

export const $isLoading = createStore<boolean>(false);
export const $anchorEl = createStore<null | HTMLElement>(null);

$isLoading.on(
  combine(productsModel.removeProductFx.pending, (...args) => args.some((isLoading) => isLoading)),
  (isLoading) => isLoading
);
$anchorEl.on(setRemoveAnchorEl, (_, data) => data);

forward({
  from: removeProduct,
  to: productsModel.removeProductFx,
});
