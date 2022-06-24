import { useStore } from 'effector-react';
import React, { FC } from 'react';

import { ITableProduct, TableIdType, TableProductsType } from '@/shared';
import { tablesModel, TablesUI } from '@/entities/tables';
import { TableProductUI } from '@/features/table-product';
import { ProductTimer } from '@/widgets/product-timer';

interface IProductCardProps {
  tableId: TableIdType;
  tableProduct: ITableProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ tableId, tableProduct }) => {
  const productsTimersOutOfLimit = useStore(tablesModel.$tablesProductsTimersOutOfLimits);
  const isTimerOut = productsTimersOutOfLimit[tableId]?.[tableProduct?.id];
  return (
    <TablesUI.ProductCard
      tableProduct={tableProduct}
      isProductTimerOut={isTimerOut}
      TableProductTimerSlot={
        <ProductTimer
          tableId={tableId}
          productId={tableProduct.id}
          pausedTimerCount={tableProduct.pausedTimerCount}
          timerStatus={tableProduct.timerStatus}
          pausedAt={tableProduct.pausedAt}
          createdAt={tableProduct.createdAt}
          minutesLimit={tableProduct.eachProductUnitMinutesTimer}
          productUnits={tableProduct.units}
        />
      }
      IncreaseTableProductSlot={<TableProductUI.IncreaseIconBtn tableId={tableId} productId={tableProduct.id} />}
      RemoveTableProductSlot={<TableProductUI.RemoveIconBtn tableId={tableId} productId={tableProduct.id} />}
      DecreaseTableProductSlot={
        <TableProductUI.DecreaseIconBtn
          tableId={tableId}
          productId={tableProduct.id}
          productUnits={tableProduct.units}
        />
      }
    />
  );
};

interface IProductCardListProps {
  tableId: TableIdType;
  products: TableProductsType;
}

export const ProductCardList: FC<IProductCardListProps> = ({ products = {}, tableId }) => (
  <>
    {Object.keys(products).map((productId) => (
      <ProductCard key={productId} tableId={tableId} tableProduct={products?.[productId]} />
    ))}
  </>
);
