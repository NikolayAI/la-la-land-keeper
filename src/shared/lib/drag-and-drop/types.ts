export interface IMoveDraggedItemParams {
  items: any[];
  dragItemIndex: number;
  hoverItemIndex: number;
}

export interface IUseSortableDndParams {
  itemId: string | number;
  itemIndex: number;
  itemTargetType: string;
  itemFnReturnIdPropertyName: string;
  itemFnReturnIndexPropertyName: string;
  onDragDataHandler: ({ dragItemIndex, hoverItemIndex }: Omit<IMoveDraggedItemParams, 'items'>) => void;
}
