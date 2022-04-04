import { ProductsType } from '@shared/api';

export interface IAddProductToTableProps {
  tableId: string;
  products: ProductsType;
}

export interface ISetAnchorElementParams {
  tableId: string;
  element: null | HTMLElement;
}
