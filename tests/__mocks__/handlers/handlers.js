import { rest } from 'msw';

import { products, tables } from './fixtures';

export const handlers = [
  rest.get('http://localhost:3001/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(products),
    );
  }),
  rest.get('http://localhost:3001/tables', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(tables),
    );
  }),
  rest.post('http://localhost:3001/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(products),
    );
  }),
  rest.post('http://localhost:3001/tables', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(tables),
    );
  }),
];