import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { getMovedDragItems, IMoveDraggedItemParams, LocalStorageKeys, ProductIdType } from '@/shared';
import { productsModel, sortProductsByOrder } from '@/entities/products';

export const dragAndDrop = createEvent<Omit<IMoveDraggedItemParams, 'items'>>();

export const $orderedProductsIds = createStore<ProductIdType[]>([]);

$orderedProductsIds.on(dragAndDrop, (state, { dragItemIndex, hoverItemIndex }) => {
  return getMovedDragItems({ items: state, dragItemIndex, hoverItemIndex });
});

persist({ store: $orderedProductsIds, key: LocalStorageKeys.productsIdsOrder });

sample({
  source: $orderedProductsIds,
  target: productsModel.$productsIds,
});

sample({
  clock: productsModel.$products,
  source: { products: productsModel.$products, productsIdsOrder: $orderedProductsIds },
  fn: ({ products, productsIdsOrder }) => sortProductsByOrder({ items: products, itemsIdsOrder: productsIdsOrder }),
  target: [productsModel.$productsIds, $orderedProductsIds],
});
