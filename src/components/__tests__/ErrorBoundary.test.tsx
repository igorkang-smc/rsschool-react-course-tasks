import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import React from 'react';

class ProblemChild extends React.Component {
  componentDidMount() {
    throw new Error('Boom');
  }
  render() {
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('catches error and renders fallback UI', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
