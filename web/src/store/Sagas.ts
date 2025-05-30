import { all, call } from 'redux-saga/effects';
import { watchTreasureHuntActions } from './treasureHunt/Sagas';

export default function* rootSaga() {
  yield all([
    call(watchTreasureHuntActions),
  ]);
}
