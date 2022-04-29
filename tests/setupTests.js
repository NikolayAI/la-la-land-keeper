import 'whatwg-fetch';
import '@testing-library/jest-dom';

import { server } from './__mocks__/server.js';

// eslint-disable-next-line no-undef
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// eslint-disable-next-line no-undef
beforeAll(() => server.listen());

// eslint-disable-next-line no-undef
afterEach(() => server.resetHandlers());

// eslint-disable-next-line no-undef
afterAll(() => server.close());
