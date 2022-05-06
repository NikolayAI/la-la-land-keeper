import { useStore } from 'effector-react';
import React, { FC } from 'react';

import {
  TableIdType,
  ITableProduct,
  TableProductTimerStatuses,
  TablesType,
} from '@/shared';
import { ProductsUI } from '@/entities/products';
import { tablesModel } from '@/entities/tables';
import { TableProductUI } from '@/features/table-product';
import { TableProductTimerUI } from '@/features/table-product-timer';

interface IProductCardProps {
  tables: TablesType;
  tableId: TableIdType;
  tableProduct: ITableProduct;
  timerStatus: TableProductTimerStatuses;
}

export const ProductCard: FC<IProductCardProps> = ({
  tables,
  tableId,
  tableProduct,
  timerStatus,
}) => {
  const productsTimersOutOfLimit = useStore(
    tablesModel.$tablesProductsTimersOutOfLimits
  );
  const isTimerOut = productsTimersOutOfLimit[tableId]?.[tableProduct?.id];
  return (
    <ProductsUI.ProductCard
      tableProduct={tableProduct}
      timerStatus={timerStatus}
      isProductTimerOut={isTimerOut}
      TableProductTimerSlot={
        <TableProductTimerUI.Timer.Display
          tables={tables}
          tableId={tableId}
          productId={tableProduct.id}
          createdAt={tableProduct.createdAt}
          minutesLimit={tableProduct.eachProductUnitMinutesTimer}
          productUnits={tableProduct.units}
          setTimer={tablesModel.setTablesProductsTimers}
        />
      }
      IncreaseTableProductSlot={
        <TableProductUI.Increase.IconBtn
          tableId={tableId}
          productId={tableProduct.id}
        />
      }
      RemoveTableProductSlot={
        <TableProductUI.Remove.IconBtn
          tableId={tableId}
          productId={tableProduct.id}
        />
      }
      DecreaseTableProductSlot={
        <TableProductUI.Decrease.IconBtn
          tableId={tableId}
          productId={tableProduct.id}
          productUnits={tableProduct.units}
        />
      }
    />
  );
};

interface IProductCardListProps {
  tables: TablesType;
  tableId: TableIdType;
}

export const ProductCardList: FC<IProductCardListProps> = ({
  tables,
  tableId,
}) => (
  <>
    {Object.keys(tables?.[tableId]?.products).map((productId) => {
      const tableProduct = tables?.[tableId]?.products?.[productId] ?? {};
      return (
        <ProductCard
          key={productId}
          tables={tables}
          tableId={tableId}
          tableProduct={tableProduct}
          timerStatus={tableProduct?.timerStatus}
        />
      );
    })}
  </>
);
