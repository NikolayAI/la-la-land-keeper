import { createRoute } from 'atomic-router';

export const tablesRoute = createRoute();
export const productsRoute = createRoute();

export const routes = [
  { path: '/', route: tablesRoute },
  { path: '/products', route: productsRoute },
];
