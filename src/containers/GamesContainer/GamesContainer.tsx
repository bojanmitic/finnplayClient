import { useEffect } from 'react';
import Grid from '../../components/GridContainer/Grid';
import { useAppDispatch, useTypedSelector } from '../../app/store';
import { actions as gamesActions, selectAllGames } from '../../ducks/gamesDuck';
import snackBar from '../../utils/snackBar';
import GridItem from '../../components/GridItem/GridItem';

interface IGamesContainerProps {
  numberOfColumns?: number;
}

const GamesContainer: React.FunctionComponent<IGamesContainerProps> = ({ numberOfColumns }) => {
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
    <Grid
      xs={{ cols: 2 }}
      md={{ cols: numberOfColumns || 3 }}
      lg={{ cols: numberOfColumns || 4 }}
      xl={{ cols: numberOfColumns || 4 }}
      xxl={{ cols: numberOfColumns || 4 }}
      gapX={'10px'}
      gapY={'10px'}
    >
      {games.map((game) => (
        <GridItem key={game.id}>{game.name}</GridItem>
      ))}
    </Grid>
  );
};

export default GamesContainer;
