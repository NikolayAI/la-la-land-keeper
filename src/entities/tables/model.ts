import { createEffect, createStore, forward } from 'effector';import {  IAddProductToTableParams,  IClearTableParams,  IDecreaseTableProductParams,  IDeleteProductToTableParams,  IDeleteTableParams,  IIncreaseTableProductParams,  ISetTableProductTimerParams,  ISetTableTitleParams,  TablesAPI,  TablesType} from '../../shared/api';export const getTablesFx = createEffect<void, TablesType, Error>();export const createTableFx = createEffect<void, void, Error>();export const deleteTableFx = createEffect<IDeleteTableParams, void, Error>();export const setTitleFx = createEffect<ISetTableTitleParams, void, Error>();export const addProductFx = createEffect<IAddProductToTableParams, void, Error>();export const deleteProductFx = createEffect<IDeleteProductToTableParams, void, Error>();export const clearTableFx = createEffect<IClearTableParams, void, Error>();export const increaseTableProductFx = createEffect<IIncreaseTableProductParams, void, Error>();export const decreaseTableProductFx = createEffect<IDecreaseTableProductParams, void, Error>();export const setTableProductTimerFx = createEffect<ISetTableProductTimerParams, void, Error>();export const $tables = createStore<TablesType>({});$tables.watch(data => console.log('tables: ', data));getTablesFx.use(async () => {  return await TablesAPI.getTables();});createTableFx.use(async () => {  await TablesAPI.createTable();});deleteTableFx.use(async ({ id }) => {  await TablesAPI.deleteTable({ id });});setTitleFx.use(async ({ id, text }) => {  await TablesAPI.setTableTitle({ id, text });});addProductFx.use(async ({ productId, tableId }) => {  await TablesAPI.addProductToTable({ productId, tableId });});deleteProductFx.use(async ({ productId, tableId }) => {  await TablesAPI.deleteProductFromTable({ productId, tableId });});clearTableFx.use(async ({ tableId }) => {  await TablesAPI.clearTable({ tableId });});increaseTableProductFx.use(async ({ productId, tableId }) => {  await TablesAPI.increaseTableProduct({ productId, tableId });});decreaseTableProductFx.use(async ({ productId, tableId }) => {  await TablesAPI.decreaseTableProduct({ productId, tableId });});setTableProductTimerFx.use(async ({ productId, tableId, value }) => {  await TablesAPI.setTableProductTimer({ productId, tableId, value });});export const $tablesIds = $tables.map((tables) => {  return Object.keys(tables);});export const $isTablesProductsTimersOutOfLimits = $tables.map((tables) => {  return Object.keys(tables).reduce((acc: Record<string, Record<string, boolean>>, tableId) => {    acc[tableId] = Object      .keys(tables[tableId].products)      .reduce((acc2: Record<string, boolean>, productId) => {        const product = tables[tableId].products[productId];        acc2[productId] = product.minutesTimer >= product.eachProductUnitMinutesTimer * product.units        return acc2;      }, {})    return acc;  }, {})})$tables  .on(getTablesFx.doneData, (_, tables) => tables);forward({  from: [    createTableFx.doneData,    deleteTableFx.doneData,    setTitleFx.doneData,    addProductFx.doneData,    deleteProductFx.doneData,    clearTableFx.doneData,    increaseTableProductFx.doneData,    decreaseTableProductFx.doneData,    setTableProductTimerFx.doneData,  ],  to: getTablesFx,});