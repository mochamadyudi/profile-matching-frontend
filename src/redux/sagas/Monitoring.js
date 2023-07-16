import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    BAD_GET_MONITORING_LIST,
    GET_MONITORING_LIST,
    OK_GET_MONITORING_LIST, REMOVE_HIGHLIGHT_MONITORING,
    SET_HIGHLIGHT_MONITORING
} from "../constants/Monitoring";
import ApiService from "../../services/api.service";
// Utility function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function* _setHighlightMonitoring(){
    yield takeEvery(SET_HIGHLIGHT_MONITORING, function*({payload}){
       yield call(delay,3000)
        yield put({
            type: REMOVE_HIGHLIGHT_MONITORING,
            payload: {id: payload?.data?.id}
        })
    })
}
function* _getMonitoringList(){
    yield takeEvery(GET_MONITORING_LIST, function*({payload}){
        try{
            if(!payload?.type) throw new Error("Error: type must be defined!")
            const response = yield call(()=> {
                return new Promise((resolve)=> {
                    resolve(new ApiService({
                        url:`/api/v1/flight/${payload?.type}`,
                        config: {
                            params:{
                                ...payload?.params
                            }
                        }
                    }).get())
                })
            })

            if(response?.success){
                yield put({
                    type: OK_GET_MONITORING_LIST,
                    payload: {
                        ...response
                    }
                })
            }else{
                yield put({
                    type: BAD_GET_MONITORING_LIST,
                    payload: {}
                })
            }

        }catch(err){
            yield put({
                type: BAD_GET_MONITORING_LIST,
            })
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(_getMonitoringList),
        fork(_setHighlightMonitoring),
    ])
}