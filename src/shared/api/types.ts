import { TableProductTimerStatuses } from './constants';

export interface IClearTableParams {
  tableId: string;
}

export interface IAddProductToTableParams {
  productId: string;
  tableId: string;
}

export interface ISetTablesProductsTimersParams
  extends IAddProductToTableParams {
  value: number;
}

export interface ISetTableProductTimerStatusParams
  extends IAddProductToTableParams {
  value: TableProductTimerStatuses;
}

export interface IDecreaseTableProductParams extends IAddProductToTableParams {
  value: number;
}

export interface IIncreaseTableProductParams extends IAddProductToTableParams {
  value: number;
}

export interface IRemoveProductToTableParams extends IAddProductToTableParams {}

export interface ISetTableTitleParams {
  id: string;
  text: string;
}

export interface IRemoveTableParams {
  id: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  isPiece: boolean;
  needTimer: boolean;
  eachProductUnitMinutesTimer: number;
}

export type ProductsType = Record<string, IProduct>;

export interface ITableProduct extends IProduct {
  units: number;
  createdAt: Date | string;
  timerStatus: TableProductTimerStatuses;
}

export type TableProductsType = Record<string, ITableProduct>;

export interface ITable {
  id: string;
  title: string;
  products: TableProductsType;
}

export type TablesType = Record<string, ITable>;

export interface ApplicationData {
  tables: TablesType;
  products: ProductsType;
}
