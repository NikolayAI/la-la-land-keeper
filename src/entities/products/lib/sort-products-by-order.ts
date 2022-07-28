import { ProductIdType, ProductsType } from '@/shared';

interface ISortProductsByOrderParams {
  items: ProductsType;
  itemsIdsOrder: (string | number)[];
}

export const sortProductsByOrder = ({ items, itemsIdsOrder }: ISortProductsByOrderParams) => {
  const orderedItemsIds: ProductIdType[] = [];
  if (!itemsIdsOrder) return Object.keys(items);
  for (const itemId of itemsIdsOrder) {
    const id = items[itemId]?.id;
    if (!id) continue;
    orderedItemsIds.push(id);
  }
  const itemsIds = Object.keys(items);
  if (orderedItemsIds.length >= itemsIds.length) return orderedItemsIds;
  const addedTables = itemsIds.filter((id) => !orderedItemsIds.includes(id));
  return [...orderedItemsIds, ...addedTables];
};
