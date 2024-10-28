import * as React from 'react';
import SearchInput from '../../components/Filters/SearchInput/SearchInput';
import './FiltersContainer.css';
import Grouping from '../../components/Filters/Grouping/Grouping';
import { IProvider } from '../../ducks/providersDuck';
import { IGroup } from '../../ducks/groupsDuck';

const sortingItems = [
  {
    id: 'a-z',
    name: 'A-Z'
  },
  {
    id: 'z-a',
    name: 'Z-A'
  },
  {
    id: 'newest',
    name: 'Newest'
  }
];
interface IFiltersContainerProps {
  searchValue: string;
  setSearchValue: (value: React.SetStateAction<string>) => void;
  providers: IProvider[];
  groups: IGroup[];
  setNumberOfCol: React.Dispatch<React.SetStateAction<string>>;
  numberOfCol: string;
}

const FiltersContainer: React.FunctionComponent<IFiltersContainerProps> = ({
  searchValue,
  setSearchValue,
  providers,
  groups,
  numberOfCol,
  setNumberOfCol
}) => {
  return (
    <div className="filters">
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <Grouping numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} items={providers} title="Providers" />
      <Grouping numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} items={groups} title="Game groups" />
      <Grouping numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} items={sortingItems} title="Sorting" />
      <Grouping numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} isWithSlider items={[]} title="Columns" />
    </div>
  );
};

export default FiltersContainer;
