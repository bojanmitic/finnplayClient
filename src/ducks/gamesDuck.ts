import createRestDuck from '../utils/restDuckGenerator';
import type { RootState } from '../app/store';

export interface IGame {
  id: string;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: Date;
}

const { reducer, adapter, actions } = createRestDuck<IGame, unknown>('games');

export const {
  selectById: selectGameById,
  selectIds: selectGameIds,
  selectEntities: selectGameEntities,
  selectAll: selectAllGames,
  selectTotal: selectTotalGames
} = adapter.getSelectors((state: RootState) => state.games);

export { reducer, actions, adapter };
