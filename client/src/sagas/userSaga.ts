import { put, takeLatest, call } from 'redux-saga/effects';
import api from './api';
import { albumActions } from '../store/album';
import { album } from '../types/album';
import { authActions } from '../store';
import { userActions } from '../store/user';
import { userwithrole } from '../types/user';



function* getUsers() {
    try {    
        const users: [userwithrole] = yield call(api.getUsers);
        yield put(userActions.getusersrequestSuccess(users));
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(userActions.getusersrequest())
        }else {
            console.error('user fetching failed:', error);
        }
        
    }
}


function* userSaga() {
    yield takeLatest(userActions.getusersrequest.type, getUsers);

  }
  
export default userSaga;


