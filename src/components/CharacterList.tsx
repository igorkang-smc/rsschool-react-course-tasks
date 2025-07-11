import { Component } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterListProps {
  isLoading: boolean;
  error: string | null;
  characters: Character[];
}

class CharacterList extends Component<CharacterListProps> {
  render() {
    const { isLoading, error, characters } = this.props;

    return (
      <section className="min-h-[300px]">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!isLoading && !error && (
          <ul className="space-y-2">
            {characters.map((c) => (
              <li
                key={c.id}
                className="grid grid-cols-[auto_1fr] gap-4 items-center border-b py-2"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-[60px] h-[60px] object-cover rounded"
                />
                <div>
                  <strong>{c.name}</strong>
                  <p className="m-0 text-sm text-gray-600">
                    {c.status} – {c.species}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default CharacterList;
