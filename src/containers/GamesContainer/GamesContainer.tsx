import { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../app/store';
import { actions as gamesActions, IGame, selectAllGames } from '../../ducks/gamesDuck';
import { actions as providersActions, selectAllProviders } from '../../ducks/providersDuck';
import { actions as groupsActions, selectAllGroups } from '../../ducks/groupsDuck';
import snackBar from '../../utils/snackBar';
import GamesComponent from '../../components/GamesComponent/GamesComponent';
import PageLayout from '../../components/Common/PageLayout/PageLayout';
import FiltersContainer, { ISortingObj } from '../FiltersContainer/FiltersContaier';
import Fuse, { FuseResult } from 'fuse.js';
import { getComparator, stableSort } from '../../utils/sorting';
import useMediaQuery from '../../hooks/useMediaQuery';
import { down } from '../../utils/brekpoints';
import './GamesContainer.css';

const GamesContainer: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [numberOfCol, setNumberOfCol] = useState('4');

  const [toggledProvidersIds, setToggledProvidersIds] = useState<number[]>([]);
  const [toggledGroupsIds, setToggledGroupsIds] = useState<number[]>([]);

  const [gamesByProv, setGamesByProv] = useState<IGame[]>([]);
  const [gamesByGroup, setGroup] = useState<IGame[]>([]);

  const [sortValueObj, setSortValueObj] = useState<ISortingObj | null>(null);
  const [sorted, setSorted] = useState<IGame[]>([]);

  const [filtered, setFiltered] = useState<IGame[]>(gamesByGroup);

  const dispatch = useAppDispatch();
  const games = useTypedSelector(selectAllGames);
  const providers = useTypedSelector(selectAllProviders);
  const groups = useTypedSelector(selectAllGroups);

  const isMobile = useMediaQuery(down('xs'));

  const options = {
    threshold: 0.2,
    keys: ['name']
  };
  const fuse = new Fuse(gamesByGroup, options);

  const formattedFuseResult = (fuseResult: FuseResult<IGame>[]) => {
    const items = fuseResult.map((value) => value.item);
    return items;
  };

  useEffect(() => {
    const getGames = async () => {
      try {
        await dispatch(gamesActions.get());
      } catch (error) {
        snackBar.error((error as string) || 'Something went wrong with fetching games');
      }
    };

    const getProviders = async () => {
      try {
        await dispatch(providersActions.get());
      } catch (error) {
        snackBar.error((error as string) || 'Something went wrong with fetching providers');
      }
    };

    const getGroups = async () => {
      try {
        await dispatch(groupsActions.get());
      } catch (error) {
        snackBar.error((error as string) || 'Something went wrong with fetching groups');
      }
    };

    if (games.length === 0) {
      getGames();
    }
    if (providers.length == 0) {
      getProviders();
    }
    if (groups.length == 0) {
      getGroups();
    }
  }, []);

  useEffect(() => {
    setGamesByProv(games);
  }, [games]);

  useEffect(() => {
    //handle providers
    if (toggledProvidersIds.length > 0) {
      const filterByProvider = games.filter((game) => toggledProvidersIds.includes(game.provider));
      setGamesByProv(filterByProvider);
    } else if (toggledProvidersIds.length === 0) {
      setGamesByProv(games);
    }
  }, [toggledProvidersIds]);

  useEffect(() => {
    //Handle groups
    if (toggledGroupsIds.length > 0) {
      const gamesIdsToAdd: number[] = [];
      toggledGroupsIds.map((id) => {
        //findGroup games
        const gamesIdsByGroupById = groups.find((group) => Number(group.id) === id)?.games;
        gamesIdsByGroupById && gamesIdsToAdd.push(...gamesIdsByGroupById);
      });
      const allGamesToAdd = gamesByProv.filter((game) => gamesIdsToAdd.includes(Number(game.id)));
      setGroup(allGamesToAdd);
    } else {
      setGroup(gamesByProv);
    }
  }, [gamesByProv, toggledGroupsIds]);

  useEffect(() => {
    if (searchValue) {
      const filteredResults = fuse.search(searchValue);
      setFiltered(formattedFuseResult(filteredResults));
    } else {
      setFiltered(gamesByGroup);
    }
  }, [searchValue, gamesByGroup]);

  useEffect(() => {
    if (sortValueObj) {
      setSorted(stableSort(filtered, getComparator(sortValueObj.order, sortValueObj.orderBy)));
    } else {
      setSorted(filtered);
    }
  }, [filtered, sortValueObj]);

  return (
    <PageLayout>
      <div className="games-container">
        <GamesComponent isMobile={isMobile} numberOfColumns={Number(numberOfCol)} games={sorted} />
        <FiltersContainer
          groups={groups}
          providers={providers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          numberOfCol={numberOfCol}
          setNumberOfCol={setNumberOfCol}
          toggledProvidersIds={toggledProvidersIds}
          setToggledProvidersIds={setToggledProvidersIds}
          toggledGroupsIds={toggledGroupsIds}
          setToggledGroupsIds={setToggledGroupsIds}
          sortValueObj={sortValueObj}
          setSortValueObj={setSortValueObj}
          isMobile={isMobile}
        />
      </div>
    </PageLayout>
  );
};

export default GamesContainer;
