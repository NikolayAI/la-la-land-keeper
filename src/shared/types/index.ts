import { ReactNode } from 'react';

/* type utilities */
export type KeyValueType<T> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

/* type aliases */
export type NotificationMessageType = string;

export type TableIdType = string;
export type TableTitleType = string;
export type TableProductIdType = string;
export type TableProductTitleType = string;
export type TableProductPriceType = number;
export type TableProductUnitsType = number;
export type TableProductMinutesLimitType = number;
export type TableProductCreatedAtType = string | Date;
export type TableProductUnitMinutesTimerType = number;

export type ProductIdType = string;
export type ProductTitleType = string;
export type ProductPriceType = number;
export type ProductUnitMinutesTimerType = number;

export type ClassNameType = string;

export interface IChildrenOnly {
  children: ReactNode;
}
