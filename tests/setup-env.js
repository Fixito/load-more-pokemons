// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './server.js';

expect.extend(matchers);

beforeAll(() =>
  server.listen({
    // Log a message whenever a test tries to call a real API, to suggest mocking it
    onUnhandledRequest(req) {
      console.warn(
        'You are directly calling an API in your test. Consider mocking the request! The unhandled call is %s %s',
        req.method,
        req.url.href
      );
    },
  })
);
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
