import { put, takeLatest, call } from 'redux-saga/effects';
import { authActions } from '../store';
import api from './api';
import { user } from '../types/user';

function* login(action: { type: string, payload: user }) {
    try {
      const { username, password } = action.payload
      
      const { accessToken } = yield call(api.login, { username, password })
  
      yield put(authActions.loginsuccess({ accessToken }))
    } catch (error) {
        yield put(authActions.loginFailure(error))
    }
  }


function* register(action: { type: string, payload: user }) {
    try {
        const { username, password } = action.payload
        
        yield call(api.register, { username, password })

        yield put(authActions.registersuccess())
    } catch (error) {
        yield put(authActions.registerfailure(error))
    }
}

function* logout() {
    try {
      
      yield call(api.logout);
  
      yield put(authActions.logoutSuccess())
    } catch (error) {
      console.error('Logout failed:', error)
    }
}

function* refresh() {
    try {

      const { accessToken } = yield call(api.refresh)
      yield put(authActions.refreshsuccess({ accessToken }))
    } catch (error) {
        yield put(authActions.logoutSuccess())
    }
}




function* authSaga() {
  yield takeLatest(authActions.loginrequest.type, login);
  yield takeLatest(authActions.logoutrequest.type, logout);
  yield takeLatest(authActions.refreshrequest.type, refresh);
  yield takeLatest(authActions.registerrequest.type, register);
}

export default authSaga;