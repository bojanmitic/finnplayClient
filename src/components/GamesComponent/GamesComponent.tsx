import * as React from 'react';
import { IGame } from '../../ducks/gamesDuck';
import GameCard from '../GameCard/GameCard';
import GridItem from '../GridItem/GridItem';
import Grid from '../GridContainer/Grid';
import './GamesComponent.css';

interface IGamesComponentProps {
  games: IGame[];
  numberOfColumns?: number;
}

const GamesComponent: React.FunctionComponent<IGamesComponentProps> = ({ games, numberOfColumns }) => {
  return (
    <div className="games-component">
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
          <GridItem key={game.id}>
            <GameCard src={game.cover} alt={game.name} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default GamesComponent;
