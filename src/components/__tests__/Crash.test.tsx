import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Crash from '../Crash';

describe('Crash', () => {
  it('renders content when shouldCrash is false', () => {
    const { getByText } = render(<Crash shouldCrash={false} />);
    expect(getByText('Component did not crash')).toBeInTheDocument();
  });

  it('logs error when shouldCrash is true (error thrown in componentDidMount)', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<Crash shouldCrash />);
    }).toThrow();

    errorSpy.mockRestore();
  });
});
