import createRestDuck from '../utils/restDuckGenerator';
import type { RootState } from '../app/store';

export interface IProvider {
  id: string;
  name: string;
  logo: string;
}

const { reducer, adapter, actions } = createRestDuck<IProvider, unknown>('providers');

export const {
  selectById: selectProviderById,
  selectIds: selectProviderIds,
  selectEntities: selectProviderEntities,
  selectAll: selectAllProviders,
  selectTotal: selectTotalProviders
} = adapter.getSelectors((state: RootState) => state.providers);

export { reducer, actions, adapter };
