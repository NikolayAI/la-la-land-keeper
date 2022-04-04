import { TableProductsType } from '@shared/api';

export const calculateTableTotalPrice = ({
  products,
}: {
  products: TableProductsType;
}) => {
  return Object.keys(products).reduce((acc, tableProductId) => {
    return (
      acc + products[tableProductId].price * products[tableProductId].units
    );
  }, 0);
};
