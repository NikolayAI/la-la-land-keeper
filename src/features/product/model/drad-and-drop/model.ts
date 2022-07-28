import { createEvent, createStore, sample } from 'effector';

import { persist } from 'effector-storage/local';
import { getMovedDragItems, IMoveDraggedItemParams, LocalStorageKeys, TableIdType } from '@/shared';
import { tablesModel, sortTablesByOrder } from '@/entities/tables';

export const dragAndDrop = createEvent<Omit<IMoveDraggedItemParams, 'items'>>();

export const $orderedTablesIds = createStore<TableIdType[]>([]);

$orderedTablesIds.on(dragAndDrop, (state, { dragItemIndex, hoverItemIndex }) => {
  return getMovedDragItems({ items: state, dragItemIndex, hoverItemIndex });
});

persist({ store: $orderedTablesIds, key: LocalStorageKeys.tablesIdsOrder });

sample({
  source: $orderedTablesIds,
  target: tablesModel.$tablesIds,
});

sample({
  clock: tablesModel.$tables,
  source: { tables: tablesModel.$tables, tablesIdsOrder: $orderedTablesIds },
  fn: ({ tables, tablesIdsOrder }) => sortTablesByOrder({ items: tables, itemsIdsOrder: tablesIdsOrder }),
  target: tablesModel.$tablesIds,
});
