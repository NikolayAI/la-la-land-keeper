import { createEvent } from 'effector';

import { IMoveDraggedItemParams, moveDraggedItem } from '@/shared';
import { tablesModel } from '@/entities/tables';

export const dragAndDrop = createEvent<Omit<IMoveDraggedItemParams, 'items'>>();

tablesModel.$tablesIds.on(dragAndDrop, (state, { dragItemIndex, hoverItemIndex }) => {
  return moveDraggedItem({ items: state, dragItemIndex, hoverItemIndex });
});
