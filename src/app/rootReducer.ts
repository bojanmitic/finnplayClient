import { combineReducers } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import { reducer as gamesReducer } from '../ducks/gamesDuck';
import { reducer as groupsReducer } from '../ducks/groupsDuck';
import { reducer as providersReducer } from '../ducks/providersDuck';

const rootReducer = combineReducers({
  auth,
  games: gamesReducer,
  groups: groupsReducer,
  providers: providersReducer
});

export default rootReducer;
