import { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../../app/store';
import { actions as gamesActions, selectAllGames } from '../../ducks/gamesDuck';
import snackBar from '../../utils/snackBar';
import GamesComponent from '../../components/GamesComponent/GamesComponent';
import PageLayout from '../../components/Common/PageLayout/PageLayout';
import FiltersContainer from '../FiltersContainer/FiltersContaier';
import './GamesContainer.css';

const GamesContainer: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const games = useTypedSelector(selectAllGames);

  useEffect(() => {
    const getGames = async () => {
      try {
        await dispatch(gamesActions.get());
      } catch (error) {
        snackBar.error('Something went wrong with fetching games');
      }
    };
    if (games.length === 0) {
      getGames();
    }
  }, []);

  return (
    <PageLayout>
      <div className="games-container">
        <GamesComponent games={games} />
        <FiltersContainer searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </PageLayout>
  );
};

export default GamesContainer;
