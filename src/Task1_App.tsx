import { Component } from 'react';
import type { FormEvent } from 'react';

import SearchForm from './components/SearchForm';
import CharacterList from './components/CharacterList';
import ErrorBoundary from './components/ErrorBoundary';
import * as React from 'react';
import Crash from './components/Crash.tsx';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface Task1AppState {
  searchInput: string;
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  throwErr: boolean;
}

const LOCAL_STORAGE_KEY = 'searchTerm';

class Task1_App extends Component<Record<string, never>, Task1AppState> {
  private controller: AbortController | null = null;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchInput: window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '',
      characters: [],
      isLoading: false,
      error: null,
      throwErr: false,
    };
  }

  componentDidMount() {
    this.fetchCharacters(this.state.searchInput);
  }

  componentWillUnmount() {
    this.controller?.abort();
  }

  fetchCharacters = async (term: string) => {
    this.controller?.abort();
    this.controller = new AbortController();

    this.setState({ isLoading: true, error: null });

    const query = term.trim() ? `?name=${encodeURIComponent(term.trim())}` : '';
    const url =
      `https://rickandmortyapi.com/api/character/${query}&page=1`.replace(
        '/&',
        '?'
      );

    try {
      const res = await fetch(url, { signal: this.controller.signal });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as { results: Character[] };
      this.setState({ characters: data.results });
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      console.error(err);
      this.setState({ error: (err as Error).message, characters: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState({ throwErr: false }, () => {
      const term = this.state.searchInput.trim();
      window.localStorage.setItem(LOCAL_STORAGE_KEY, term);
      this.fetchCharacters(term);
    });
  };

  triggerError = () => {
    this.setState({ throwErr: true });
  };

  render() {
    const { searchInput, characters, isLoading, error, throwErr } = this.state;

    return (
      <div className="max-w-3xl mx-auto p-4">
        <SearchForm
          searchInput={searchInput}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <ErrorBoundary key={throwErr ? 'error' : 'normal'}>
          {throwErr ? (
            <Crash />
          ) : (
            <CharacterList
              isLoading={isLoading}
              error={error}
              characters={characters}
            />
          )}
        </ErrorBoundary>
        <button
          type="button"
          className="mt-4 text-red-600 underline"
          onClick={this.triggerError}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default Task1_App;
