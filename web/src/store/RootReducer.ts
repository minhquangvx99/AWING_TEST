import { combineReducers } from 'redux';
import layoutReducer from './theme-layout/Reducer';
import treasureHuntReducer from './treasureHunt/Reducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  treasureHunt: treasureHuntReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
