import { put, takeLatest, call } from 'redux-saga/effects';
import api from './api';
import { authActions } from '../store';
import { song, songwithuser } from '../types/song';
import { songActions } from '../store/song';



function* createSong(action: { type: string, payload: song }) {
    try {
        const song = action.payload;
        
        if (song._id){
            yield call(api.updateSong, song)
        } else {
            yield call(api.createSong, song)
        }

        yield put(songActions.getSongRequest());
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(songActions.createSongRequest(action.payload))
        }else {
            console.error('create song failed:', error);
        }
        
    }
}

function* getSongs() {
    try {    
        const songs: [songwithuser] = yield call(api.getSongs);
        yield put(songActions.getSongRequestSuccess(songs));
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(songActions.getSongRequest())
        }else {
            console.error('song fetching failed:', error);
        }
        
    }
}

function* deleteSongs(action: { type: string, payload: {_id: string} }) {
    try {    
        yield call(api.deleteSong, action.payload);
        yield put(songActions.getSongRequest());
    } catch (error: any) {
        if (error.status === 403) {
            yield put(authActions.refreshrequest())
            yield put(songActions.getSongRequest())
        }else {
            console.error('album fetching failed:', error);
        }
        
    }
}


function* songSaga() {
    yield takeLatest(songActions.createSongRequest.type, createSong);
    yield takeLatest(songActions.getSongRequest.type, getSongs);
    yield takeLatest(songActions.deleteSongRequest.type, deleteSongs);
  }
  
export default songSaga;


