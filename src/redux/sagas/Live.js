import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {BAD_SAVE_LE_TMP, OK_SAVE_LE_TMP, POST_SAVE_LE_TMP} from "../constants/Live.template";
import {message} from "antd";


export function* SaveLeTmp() {
    yield takeEvery(POST_SAVE_LE_TMP, function* ({body}) {
        try {
            const response = yield call(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({error: false, message: 'ok'})
                    }, 2000)
                })
            })

            if (!response?.error) {
                message.success({
                    content: "Successfully!",
                    duration: 5
                })
                yield all([
                    put({
                        type: OK_SAVE_LE_TMP,
                    })
                ])
            }
        } catch (err) {
            yield put({type: BAD_SAVE_LE_TMP})
        }
    })


}

export default function* rootSaga() {
    yield all([
        fork(SaveLeTmp)
    ])
}