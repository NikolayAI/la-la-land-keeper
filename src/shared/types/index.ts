import { ReactNode } from 'react';

import { TableProductTimerStatuses } from '../constants';

/* type utilities */
export type KeyValueType<T> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

/* type aliases */
export type NotificationMessageType = string;

export type TableIdType = string;
export type TableNameType = string;
export type TableProductIdType = string;
export type TableProductNameType = string;
export type TableProductPriceType = number;
export type TableProductUnitsType = number;
export type TableProductMinutesLimitType = number;
export type TableProductCreatedAtType = string | Date;
export type TableProductTimerStatusType = TableProductTimerStatuses;
export type TableProductPausedAtType = Date | null;
export type TableProductPausedTimerCountType = number;
export type TableProductsTimersType = Record<TableIdType, Record<TableProductIdType, number>>;
export type TablesType = Record<TableIdType, ITable>;
export type TablesLoadingType = Record<TableIdType, boolean>;
export type TablesProductsLoadingType = Record<TableIdType, Record<TableProductIdType, boolean>>;

export type ProductIdType = string;
export type ProductNameType = string;
export type ProductPriceType = number;
export type ProductUnitMinutesTimerType = number;
export type ProductsLoadingType = Record<ProductIdType, boolean>;

export type ClassNameType = string;

/* types */
export interface IChildrenOnly {
  children: ReactNode;
}

export interface IClearTableParams {
  tableId: TableIdType;
}

export interface IAddProductToTableParams {
  productId: ProductIdType;
  tableId: TableIdType;
}

export interface ISetTablesProductsTimersParams extends IAddProductToTableParams {
  value: number;
}

export interface ISetTableProductTimerStatusParams extends IAddProductToTableParams {
  timerStatus: TableProductTimerStatusType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
}

export interface IDecreaseTableProductParams extends IAddProductToTableParams {
  value: number;
}

export interface IIncreaseTableProductParams extends IAddProductToTableParams {
  value: number;
}

export interface IRemoveProductToTableParams extends IAddProductToTableParams {}

export interface ISetTableNameParams {
  tableId: TableIdType;
  text: string;
}

export interface IRemoveTableParams {
  tableId: TableIdType;
}

export interface IRemoveProductParams {
  productId: ProductIdType;
}

export interface IProduct {
  id: ProductIdType;
  name: ProductNameType;
  price: ProductPriceType;
  isPiece: boolean;
  needTimer: boolean;
  eachProductUnitMinutesTimer: ProductUnitMinutesTimerType;
}

export type ProductsType = Record<ProductIdType, IProduct>;

export interface ITableProduct extends IProduct {
  units: TableProductUnitsType;
  createdAt: TableProductCreatedAtType;
  timerStatus: TableProductTimerStatusType;
  pausedAt: TableProductPausedAtType;
  pausedTimerCount: TableProductPausedTimerCountType;
}

export type TableProductsType = Record<ProductIdType, ITableProduct>;

export interface ITable {
  id: TableIdType;
  name: TableNameType;
  products: TableProductsType;
}
