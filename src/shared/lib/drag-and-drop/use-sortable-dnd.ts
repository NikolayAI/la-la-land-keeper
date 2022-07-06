import { Identifier } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import { IUseSortableDndParams, IDropItem } from './types';

export const useSortableDnd = <T, R extends HTMLElement>({
  itemId,
  itemIndex,
  itemTargetType,
  onDragDataHandler,
}: IUseSortableDndParams) => {
  const ref = useRef<R>(null);
  const [{ handlerId }, drop] = useDrop<IDropItem<T>, void, { handlerId: Identifier | null }>({
    accept: itemTargetType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDropItem<T>, monitor) {
      if (!ref.current) {
        return;
      }
      const dragItemIndex = item.index;
      const hoverItemIndex = itemIndex;

      // Don't replace items with themselves
      if (dragItemIndex === hoverItemIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect!.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onDragDataHandler({ dragItemIndex, hoverItemIndex });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverItemIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: itemTargetType,
    item: () => {
      return { id: itemId, index: itemIndex };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return { ref, handlerId, opacity };
};
