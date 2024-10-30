import { useState } from 'react';
import SearchInput from '../../components/Filters/SearchInput/SearchInput';
import Grouping from '../../components/Filters/Grouping/Grouping';
import { IProvider } from '../../ducks/providersDuck';
import { IGroup } from '../../ducks/groupsDuck';
import { Order } from '../../utils/sorting';
import { IGame } from '../../ducks/gamesDuck';
import SortingToggle from '../../components/Filters/SortingToggle/SortingToggle';
import './FiltersContainer.css';
import { HamburgerIcon } from './HanmurgerIcon';

export interface ISortingObj {
  id: string;
  name: string;
  order: Order;
  orderBy: keyof IGame;
}

export const sortingItems: ISortingObj[] = [
  {
    id: 'a-z',
    name: 'A-Z',
    order: 'asc',
    orderBy: 'name'
  },
  {
    id: 'z-a',
    name: 'Z-A',
    order: 'desc',
    orderBy: 'name'
  },
  {
    id: 'newest',
    name: 'Newest',
    order: 'asc',
    orderBy: 'date'
  }
];
interface IFiltersContainerProps {
  searchValue: string;
  setSearchValue: (value: React.SetStateAction<string>) => void;
  providers: IProvider[];
  groups: IGroup[];
  setNumberOfCol: React.Dispatch<React.SetStateAction<string>>;
  numberOfCol: string;
  toggledProvidersIds: number[];
  setToggledProvidersIds: React.Dispatch<React.SetStateAction<number[]>>;
  toggledGroupsIds: number[];
  setToggledGroupsIds: React.Dispatch<React.SetStateAction<number[]>>;
  sortValueObj: ISortingObj | null;
  setSortValueObj: React.Dispatch<React.SetStateAction<ISortingObj | null>>;
  isMobile: boolean;
}

const FiltersContainer: React.FunctionComponent<IFiltersContainerProps> = ({
  searchValue,
  setSearchValue,
  providers,
  groups,
  numberOfCol,
  setNumberOfCol,
  toggledProvidersIds,
  setToggledProvidersIds,
  toggledGroupsIds,
  setToggledGroupsIds,
  sortValueObj,
  setSortValueObj,
  isMobile
}) => {
  const [isShowFilters, setIsShowFilters] = useState(false);
  return (
    <div className={`${isMobile ? 'filters-mobile' : ''} filters`}>
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      {(isShowFilters || !isMobile) && (
        <>
          <Grouping
            toggled={toggledProvidersIds}
            setToggled={setToggledProvidersIds}
            numberOfCol={numberOfCol}
            setNumberOfCol={setNumberOfCol}
            items={providers}
            title="Providers"
          />
          <Grouping
            toggled={toggledGroupsIds}
            setToggled={setToggledGroupsIds}
            numberOfCol={numberOfCol}
            setNumberOfCol={setNumberOfCol}
            items={groups}
            title="Game groups"
          />

          <SortingToggle
            title="Sorting"
            items={sortingItems}
            setSortValueObj={setSortValueObj}
            sortValueObj={sortValueObj}
          />
        </>
      )}
      {!isMobile && (
        <Grouping numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} isWithSlider items={[]} title="Columns" />
      )}
      {isMobile && (
        <button onClick={() => setIsShowFilters(!isShowFilters)} className="filters-button">
          <HamburgerIcon />
          <span style={{ marginLeft: '5px' }}>{isShowFilters ? 'Hide filters' : 'Show filters'}</span>
        </button>
      )}
    </div>
  );
};

export default FiltersContainer;
