import { combineReducers } from '@reduxjs/toolkit';
import auth from '../slices/authSlice';
import { reducer as gamesReducer } from '../ducks/gamesDuck';

const rootReducer = combineReducers({
  auth,
  games: gamesReducer
});

export default rootReducer;
