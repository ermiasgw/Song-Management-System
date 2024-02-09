import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { authReducer } from './auth';
import { albumReducer } from './album';
import { userReducer } from './user';
import { statisticsReducer } from './statistics';
import { songReducer } from './song';

const saga = createSagaMiddleware()

const reducer = combineReducers({
    authReducer,
    albumReducer,
    userReducer,
    statisticsReducer,
    songReducer,
})

export { authActions } from './auth'

export type RootState = ReturnType<typeof reducer>; 

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
  }); 

saga.run(rootSaga)

export default store