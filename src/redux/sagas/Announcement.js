import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {FAILURE, NOTFOUND, REQUEST, SUCCESS} from "../actions/action.type";
import {
    GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST,
    OPEN_PLAYER_ANNOUNCEMENT,
    SELECT_ANNOUNCEMENT
} from "../constants/Announcement";
import ApiService from "../../services/api.service";


export function* _selectedAnnouncement(){
    yield takeEvery(REQUEST(SELECT_ANNOUNCEMENT), function*({payload}){
        try{
            const response = yield call(()=> {
                return new Promise((resolve)=> {
                    resolve(new ApiService({
                            url:`/api/v1/announcement.json`,
                            mode:"local",
                        }).get()
                            .then((response)=> {
                                return response
                            })
                        .catch((err)=> {
                            return {
                                data: null
                            }
                        })
                    )
                })
            })
            if(response?.data){
                yield all([
                    put({
                        type:SUCCESS(SELECT_ANNOUNCEMENT),
                        payload:{
                            data: response?.data[0]
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type:FAILURE(SELECT_ANNOUNCEMENT)
                    })
                ])
            }

        }catch(err){
            yield all([
                put({
                    type:FAILURE(SELECT_ANNOUNCEMENT)
                })
            ])
        }
    })
}
export function* _openPlayerAnnouncement(){
    yield takeEvery(REQUEST(OPEN_PLAYER_ANNOUNCEMENT),
        function*({payload}){
        try{
            if(typeof(payload) === 'object' && typeof(payload?.isType) !== 'undefined' && typeof(payload?.isType) === 'string'){
                if(payload?.isType === "SELECTED"){
                    yield put({
                        type:REQUEST(SELECT_ANNOUNCEMENT),
                        payload:{
                            data: payload?.data
                        }
                    })
                }
            }
        }catch(err){
            yield all([
                put({
                    type:FAILURE(OPEN_PLAYER_ANNOUNCEMENT)
                })
            ])
        }
    })
}

export function* __getSelectionsAnnouncementCategory(){
    yield takeEvery(REQUEST(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST), function*({payload}){
        try{
            const response = yield call(()=> {
                return new Promise((resolve)=> {
                    resolve(
                        new ApiService({
                            url:`/api/v1/announcement/categories`,
                            config : {
                                params: {
                                    ...payload
                                }
                            }
                        }).get()
                    )
                })
            })
            console.log({response})

            if(response?.success){
                if(response?.data && Array.isArray(response?.data) && response?.data.length > 0){
                    response.data = response.data.map((item,index)=> ({
                        ...item,
                        order:index
                    }))
                }
                yield all([
                    put({
                        type:SUCCESS(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST),
                        payload: {
                            ...response
                        }
                    })
                ])
            }else{
                yield all([
                    put({
                        type: NOTFOUND(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST)
                    })
                ])
            }
        }catch(err){
            yield all([
                put({
                    type: FAILURE(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST)
                })
            ])
        }
    })
}
export default function* rootSaga(){
    yield all([
        fork(__getSelectionsAnnouncementCategory),
        fork(_openPlayerAnnouncement),
        fork(_selectedAnnouncement),
    ])
}