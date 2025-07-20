import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Task1_App from './Task1_App';
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

describe('Task1_App with MSW v2', () => {
  it('fetches and displays characters on mount', async () => {
    render(<Task1_App skipAbort />);
    expect(await screen.findByText(/Morty Smith/i)).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    // Мокаем ошибку 500
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.text('Internal Server Error', { status: 500 });
      })
    );

    render(<Task1_App skipAbort />); // <-- пропускаем AbortController

    await waitFor(() => {
      expect(screen.getByText(/request failed: 500/i)).toBeInTheDocument();
    });
  });

  it('saves search term in localStorage', async () => {
    render(<Task1_App skipAbort />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Morty');
    });
  });
});
