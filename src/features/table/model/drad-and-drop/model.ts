import { createEvent } from 'effector';

import { IMoveDraggedItemParams, getMovedDragItems, localStorageSetItem, LocalStorageKeys } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const dragAndDrop = createEvent<Omit<IMoveDraggedItemParams, 'items'>>();

tablesModel.$tablesIds.on(dragAndDrop, (state, { dragItemIndex, hoverItemIndex }) => {
  const movedTables = getMovedDragItems({ items: state, dragItemIndex, hoverItemIndex });
  localStorageSetItem({ key: LocalStorageKeys.tablesIdsOrder, value: movedTables });
  return movedTables;
});
