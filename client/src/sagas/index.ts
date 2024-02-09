import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import albumSaga from './albumSaga';
import userSaga from './userSaga'
import statisticsSaga from './statisticsSaga';
import songSaga from './songSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    albumSaga(),
    userSaga(),
    statisticsSaga(),
    songSaga(),
  ]);
}