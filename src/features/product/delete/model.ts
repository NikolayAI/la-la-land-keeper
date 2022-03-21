import { createEvent, createStore, forward } from 'effector';

import { productsModel } from '../../../entities/products';

export const deleteProduct = createEvent<{ id: string }>();
export const setAnchorEl = createEvent<null | HTMLElement>();

export const $anchorEl = createStore<null | HTMLElement>(null);

$anchorEl.on(setAnchorEl, (_, data) => data);

forward({
  from: deleteProduct,
  to: productsModel.deleteProductFx,
});