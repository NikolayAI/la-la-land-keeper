import { TableProductsType } from 'shared/api';

export const calculateTableTotalPrice = ({
  products,
}: {
  products: TableProductsType;
}) => Object.keys(products).reduce((acc, tableProductId) => (
      acc + products[tableProductId].price * products[tableProductId].units
    ), 0);
