import { TableIdType, TablesType } from '@/shared';

interface ISortTablesByOrderParams {
  items: TablesType;
  itemsIdsOrder: (string | number)[];
}

export const sortTablesByOrder = ({ items, itemsIdsOrder }: ISortTablesByOrderParams) => {
  const orderedItemsIds: TableIdType[] = [];
  if (itemsIdsOrder?.length < 1) return Object.keys(items);
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
