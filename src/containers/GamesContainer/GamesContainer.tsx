import { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../app/store';
import { actions as gamesActions, selectAllGames } from '../../ducks/gamesDuck';
import { actions as providersActions, selectAllProviders } from '../../ducks/providersDuck';
import { actions as groupsActions, selectAllGroups } from '../../ducks/groupsDuck';

import snackBar from '../../utils/snackBar';
import GamesComponent from '../../components/GamesComponent/GamesComponent';
import PageLayout from '../../components/Common/PageLayout/PageLayout';
import FiltersContainer from '../FiltersContainer/FiltersContaier';
import './GamesContainer.css';

const GamesContainer: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [numberOfCol, setNumberOfCol] = useState('4');

  const dispatch = useAppDispatch();
  const games = useTypedSelector(selectAllGames);
  const providers = useTypedSelector(selectAllProviders);
  const groups = useTypedSelector(selectAllGroups);

  useEffect(() => {
    const getGames = async () => {
      try {
        await dispatch(gamesActions.get());
      } catch (error) {
        snackBar.error('Something went wrong with fetching games');
      }
    };

    const getProviders = async () => {
      try {
        await dispatch(providersActions.get());
      } catch (error) {
        snackBar.error('Something went wrong with fetching games');
      }
    };

    const getGroups = async () => {
      try {
        await dispatch(groupsActions.get());
      } catch (error) {
        snackBar.error('Something went wrong with fetching games');
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
  }, [games, providers]);

  return (
    <PageLayout>
      <div className="games-container">
        <GamesComponent games={games} />
        <FiltersContainer
          groups={groups}
          providers={providers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          numberOfCol={numberOfCol}
          setNumberOfCol={setNumberOfCol}
        />
      </div>
    </PageLayout>
  );
};

export default GamesContainer;
