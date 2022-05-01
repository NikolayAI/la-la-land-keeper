import 'whatwg-fetch';
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import { randomFillSync } from 'crypto';

import { server } from './__mocks__/server.js';

window.crypto = {
  getRandomValues: function (buffer) {
    return randomFillSync(buffer);
  },
};

// eslint-disable-next-line no-undef
beforeAll(() => server.listen());

// eslint-disable-next-line no-undef
afterEach(() => server.resetHandlers());

// eslint-disable-next-line no-undef
afterAll(() => server.close());
