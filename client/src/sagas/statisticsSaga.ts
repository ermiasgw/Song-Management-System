import { put, takeLatest, call } from 'redux-saga/effects';
import api from './api';
import { authActions } from '../store';
import { statisticsActions } from '../store/statistics';
import { statistics } from '../types/statistics';



function* getStatistics() {
    try {    
        const statistics: statistics = yield call(api.getStatistics);
        yield put(statisticsActions.getStatisticsRequestSuccess(statistics));
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(statisticsActions.getStatisticsRequest())
        }else {
            console.error('user fetching failed:', error);
        }
        
    }
}


function* statisticsSaga() {
    yield takeLatest(statisticsActions.getStatisticsRequest.type, getStatistics);

  }
  
export default statisticsSaga;


