// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Polyfill "window.fetch" used in the React components.
import 'whatwg-fetch';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
