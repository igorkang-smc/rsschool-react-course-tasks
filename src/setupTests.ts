import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { server } from './mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';
import 'whatwg-fetch';
import AbortController from 'abort-controller';

// ✅ Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// ✅ Silence console errors (ErrorBoundary, etc.)
vi.spyOn(console, 'error').mockImplementation(() => {});

// ✅ MSW lifecycle
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// @ts-expect-error: We're overriding the global for testing purposes
global.AbortController = AbortController;
