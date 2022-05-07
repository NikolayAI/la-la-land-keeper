import {
  ProductIdType,
  ProductPriceType,
  ProductTitleType,
  ProductUnitMinutesTimerType,
  TableIdType,
  TableProductCreatedAtType,
  TableProductUnitsType,
  TableTitleType,
} from '../types';
import { TableProductTimerStatuses } from './constants';

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
  id: TableIdType;
  text: string;
}

export interface IRemoveTableParams {
  id: TableIdType;
}

export interface IProduct {
  id: ProductIdType;
  title: ProductTitleType;
  price: ProductPriceType;
  isPiece: boolean;
  needTimer: boolean;
  eachProductUnitMinutesTimer: ProductUnitMinutesTimerType;
}

export type ProductsType = Record<ProductIdType, IProduct>;

export interface ITableProduct extends IProduct {
  units: TableProductUnitsType;
  createdAt: TableProductCreatedAtType;
  timerStatus: TableProductTimerStatuses;
}

export type TableProductsType = Record<ProductIdType, ITableProduct>;

export interface ITable {
  id: TableIdType;
  title: TableTitleType;
  products: TableProductsType;
}

export type TablesType = Record<TableIdType, ITable>;
