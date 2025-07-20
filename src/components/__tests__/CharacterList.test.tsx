import { render, screen } from '@testing-library/react';
import CharacterList from '../CharacterList';

const characters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'rick.png',
  },
];

describe('CharacterList', () => {
  it('shows loading spinner', () => {
    render(<CharacterList isLoading={true} error={null} characters={[]} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<CharacterList isLoading={false} error="Failed" characters={[]} />);
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it('displays characters', () => {
    render(
      <CharacterList isLoading={false} error={null} characters={characters} />
    );
    expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
    expect(screen.getByText(/Alive – Human/)).toBeInTheDocument();
  });
});
