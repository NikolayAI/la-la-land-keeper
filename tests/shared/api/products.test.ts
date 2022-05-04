import {
  createProduct,
  removeProduct,
  getProducts,
  setProducts,
} from '@/shared/api/products';
import { products, product } from '../../__mocks__/fixtures';

test('getProducts should return value', async () => {
  const result = await getProducts();

  expect(result).toStrictEqual(products);
});

test('should call setProducts', async () => {
  const result = await setProducts(products);

  expect(result).toStrictEqual(undefined);
});

test('should call createProduct', async () => {
  const result = await createProduct(product);

  expect(result).toStrictEqual(undefined);
});

test('should call removeProduct', async () => {
  const result = await removeProduct({ id: product.id });

  expect(result).toStrictEqual(undefined);
});
