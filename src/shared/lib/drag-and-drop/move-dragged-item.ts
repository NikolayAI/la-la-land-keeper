import { IMoveDraggedItemParams } from './types';

export const getMovedDragItems = ({ items, dragItemIndex, hoverItemIndex }: IMoveDraggedItemParams) => {
  const dragItem = items[dragItemIndex];
  const hoverItem = items[hoverItemIndex];
  const updatedItems = [...items];
  updatedItems[dragItemIndex] = hoverItem;
  updatedItems[hoverItemIndex] = dragItem;
  return updatedItems;
};
