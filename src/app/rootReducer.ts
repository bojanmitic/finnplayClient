import { Action, combineReducers, createAction } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import { reducer as gamesReducer } from '../ducks/gamesDuck';
import { reducer as groupsReducer } from '../ducks/groupsDuck';
import { reducer as providersReducer } from '../ducks/providersDuck';

const appReducer = combineReducers({
  auth,
  games: gamesReducer,
  groups: groupsReducer,
  providers: providersReducer
});

export const clearStore = createAction('clear-store');

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: Action) => {
  //reset store on logout
  if (action.type === 'clear-store') {
    return appReducer(undefined, { type: '' });
  }

  return appReducer(state, action);
};

export default rootReducer;
