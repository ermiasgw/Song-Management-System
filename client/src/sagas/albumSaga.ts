import { put, takeLatest, call } from 'redux-saga/effects';
import api from './api';
import { albumActions } from '../store/album';
import { album, albumwithid } from '../types/album';
import { authActions } from '../store';



function* createAlbum(action: { type: string, payload: album }) {
    try {
        const { title } = action.payload;
        
        yield call(api.createAlbum, { title });

        yield put(albumActions.createAlbumsuccess());
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(albumActions.createAlbumrequest(action.payload))
        }else {
            console.error('create Album failed:', error);
        }
        
    }
}

function* getAlbums() {
    try {    
        const albums: [albumwithid] = yield call(api.getAlbums);
        yield put(albumActions.getAlbumrRequestSuccess(albums));
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(albumActions.getAlbumsRequest())
        }else {
            console.error('album fetching failed:', error);
        }
        
    }
}


function* albumSaga() {
    yield takeLatest(albumActions.createAlbumrequest.type, createAlbum);
    yield takeLatest(albumActions.getAlbumsRequest.type, getAlbums);
  }
  
export default albumSaga;


