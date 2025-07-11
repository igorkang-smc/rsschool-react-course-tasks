import { Component } from 'react';
import type { FormEvent } from 'react';

interface SearchFormProps {
  searchInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

class SearchForm extends Component<SearchFormProps> {
  render() {
    const { searchInput, onChange, onSubmit } = this.props;

    return (
      <form onSubmit={onSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={onChange}
          placeholder="Search characters..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
