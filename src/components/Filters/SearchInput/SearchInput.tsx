import * as React from 'react';
import SearchIcon from './SearchIcon';
import './SearchInput.css';

interface ISearchInputProps {
  searchValue: string;
  setSearchValue: (value: React.SetStateAction<string>) => void;
}

const SearchInput: React.FunctionComponent<ISearchInputProps> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="search">
      <br />
      <input
        type="text"
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
        className="search-input"
        placeholder="Search"
      />
      <span className="search-input-icon">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchInput;
