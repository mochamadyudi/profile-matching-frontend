import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {AUDIO_PLAY, AUDIO_SELECT_AND_PLAY, AUDIO_STOP, PLAYER_CLOSED} from "../constants";

export function* newSelectedAudio(){
    yield takeEvery(AUDIO_SELECT_AND_PLAY, function* ({payload}){
        try{
            yield put({
                type:PLAYER_CLOSED,
                payload
            })
            yield call(()=> {
                return new Promise((resolve)=> {
                    resolve(setTimeout(()=>{},2000))
                })
            })
            yield put({
                type:AUDIO_PLAY,
                payload
            })
        }catch(err){
            yield put({
                type:AUDIO_STOP,
                payload: {
                    isType:"STOP",

                }
            })
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(newSelectedAudio)
    ])
}