import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const handleChange = vi.fn();
  const handleSubmit = vi.fn();

  beforeEach(() => {
    render(
      <SearchForm
        searchInput="Morty"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  });

  it('renders input and button', () => {
    expect(
      screen.getByPlaceholderText(/search characters/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    fireEvent.change(screen.getByPlaceholderText(/search characters/i), {
      target: { value: 'Rick' },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onSubmit on form submit', () => {
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
