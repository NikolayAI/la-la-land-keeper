export interface IMoveDraggedItemParams {
  items: any[];
  dragItemIndex: number;
  hoverItemIndex: number;
}

export interface IUseSortableDndParams {
  itemId: string | number;
  itemIndex: number;
  itemTargetType: string;
  onDragDataHandler: (payload: Omit<IMoveDraggedItemParams, 'items'>) => void;
}

export interface IDropItem<T> {
  item: T;
  id: number | string;
  index: number;
}
