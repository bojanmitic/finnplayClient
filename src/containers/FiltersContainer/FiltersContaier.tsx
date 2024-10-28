import * as React from 'react';
import SearchInput from '../../components/Filters/SearchInput/SearchInput';
import './FiltersContainer.css';

interface IFiltersContainerProps {
  searchValue: string;
  setSearchValue: (value: React.SetStateAction<string>) => void;
}

const FiltersContainer: React.FunctionComponent<IFiltersContainerProps> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="filters">
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
};

export default FiltersContainer;
