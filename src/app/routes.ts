import { productsRoute } from '@/pages/products';
import { tablesRoute } from '@/pages/tables';

export const routes = [
  { path: '/', route: tablesRoute },
  { path: '/products', route: productsRoute },
];
