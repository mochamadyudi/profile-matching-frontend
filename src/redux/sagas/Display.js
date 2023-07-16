import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    __BAD_LIST_DISPLAY_SYSTEM,
    __DELETE_DISPLAY_SYSTEM_IN_LIST,
    __GET_LIST_DISPLAY_SYSTEM,
    __GET_SHOW_DISPLAY_SYSTEM, __OK_LIST_DISPLAY_SYSTEM,
    __POST_DISPLAY_SYSTEM
} from "../constants/Display";
import ApiService from "../../services/api.service";
export function* _getDSystemList(){
    yield takeEvery(__GET_LIST_DISPLAY_SYSTEM, function*({payload}){
        try{
            const response = yield call(()=> {
                return new Promise((resolve)=> {
                    resolve(new ApiService({
                        url:`/api/v1/flight/${payload?.type}`,
                        config : {
                            params: {
                                ...payload?.query
                            }
                        }
                    }).get())
                })
            })

            if(response?.success){
                yield put({
                    type: __OK_LIST_DISPLAY_SYSTEM,
                    payload: {
                        ...response
                    }
                })
            }else{
                yield put({
                    type: __BAD_LIST_DISPLAY_SYSTEM,
                    payload: {}
                })
            }


        }catch(err){
            yield put({
                type: __BAD_LIST_DISPLAY_SYSTEM,
                payload: {}
            })
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(_getDSystemList)
    ])
}