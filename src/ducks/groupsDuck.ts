import createRestDuck from '../utils/restDuckGenerator';
import type { RootState } from '../app/store';

export interface IGroup {
  id: string;
  name: string;
  games: number[];
}

const { reducer, adapter, actions } = createRestDuck<IGroup, unknown>('groups');

export const {
  selectById: selectGroupsById,
  selectIds: selectGroupsIds,
  selectEntities: selectGroupsEntities,
  selectAll: selectAllGroups,
  selectTotal: selectTotalGroups
} = adapter.getSelectors((state: RootState) => state.groups);

export { reducer, actions, adapter };
