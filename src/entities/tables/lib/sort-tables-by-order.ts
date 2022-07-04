import { localStorageGetItem, LocalStorageKeys, TableIdType, TablesType } from '@/shared';

export const sortTablesByOrder = (tables: TablesType) => {
  const orderedItemsIds: TableIdType[] = [];
  const itemsIdsOrder = localStorageGetItem({ key: LocalStorageKeys.tablesIdsOrder });
  if (!itemsIdsOrder) return Object.keys(tables);
  for (const itemId of itemsIdsOrder) {
    const id = tables[itemId]?.id;
    if (!id) continue;
    orderedItemsIds.push(id);
  }
  const itemsIds = Object.keys(tables);
  if (orderedItemsIds.length >= itemsIds.length) return orderedItemsIds;
  const addedTables = itemsIds.filter((id) => !orderedItemsIds.includes(id));
  return [...orderedItemsIds, ...addedTables];
};
