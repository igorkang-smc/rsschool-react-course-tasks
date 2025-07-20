import { describe, it, beforeAll, afterAll, expect } from 'vitest';

beforeAll(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

afterAll(() => {
  const root = document.getElementById('root');
  if (root) root.remove();
});

describe('main.tsx', () => {
  it('renders without crashing', async () => {
    await expect(import('./main.tsx')).resolves.toBeDefined();
  });
});
