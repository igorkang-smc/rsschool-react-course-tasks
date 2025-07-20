import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { render } from '@testing-library/react';
import Crash from '../Crash';

describe('Crash', () => {
  it('throws an error when rendered', () => {
    // Error boundaries catch this in real app, so here we expect a thrown error
    expect(() => render(<Crash />)).toThrow('User triggered error');
  });
});
