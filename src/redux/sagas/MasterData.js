import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {
	__BAD_LIST_MD_AIRLINES,
	__BAD_LIST_MD_AIRLINES_STATUS,
	__BAD_LIST_MD_AIRLINES_TYPE, __BAD_LIST_MD_CITY,
	__BAD_LIST_MD_LOCATION,
	__BAD_LIST_MD_THIN_CLIENT,
	__GET_LIST_MD_AIRLINES,
	__GET_LIST_MD_AIRLINES_STATUS,
	__GET_LIST_MD_AIRLINES_TYPE, __GET_LIST_MD_CITY,
	__GET_LIST_MD_LOCATION,
	__GET_LIST_MD_THIN_CLIENT, __OK_LIST_MD_AIRLINES,
	__OK_LIST_MD_AIRLINES_STATUS,
	__OK_LIST_MD_AIRLINES_TYPE, __OK_LIST_MD_CITY,
	__OK_LIST_MD_LOCATION,
	__OK_LIST_MD_THIN_CLIENT, GET_MD_THIN_CLIENT_STATUS
} from "../constants/MasterData";
import ApiService from "../../services/api.service";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";

export function* _getMDListLocation() {
	yield takeEvery(__GET_LIST_MD_LOCATION, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/master-data/location`,
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (response?.success) {
				yield put({
					type: __OK_LIST_MD_LOCATION,
					payload: {
						...response
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_LOCATION,
					payload: {}
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_LOCATION,
				payload: {}
			})
		}
	})
}

export function* _getMDListThinClient() {
	yield takeEvery(__GET_LIST_MD_THIN_CLIENT, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/thin-client`,
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (response?.success) {
				yield put({
					type: __OK_LIST_MD_THIN_CLIENT,
					payload: {
						...response
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_THIN_CLIENT,
					payload: {}
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_THIN_CLIENT,
				payload: {}
			})
		}
	})
}

export function* _getMDListAirlinesStatus() {
	yield takeEvery(__GET_LIST_MD_AIRLINES_STATUS, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/master-data/airline-status`,
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (response?.success) {
				yield put({
					type: __OK_LIST_MD_AIRLINES_STATUS,
					payload: {
						...response,
						params: payload?.query,
						query: payload?.query,
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_AIRLINES_STATUS
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_AIRLINES_STATUS
			})
		}
	})
}

export function* _getMDListAirlinesTypes() {
	yield takeEvery(__GET_LIST_MD_AIRLINES_TYPE, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/master-data/airline-type`,
						mode:"express",
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (!response?.error) {
				yield put({
					type: __OK_LIST_MD_AIRLINES_TYPE,
					payload: {
						...response,
						params: payload?.query,
						query: payload?.query,
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_AIRLINES_TYPE
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_AIRLINES_TYPE
			})
		}
	})
}

export function* _getMDListAirlines() {
	yield takeEvery(__GET_LIST_MD_AIRLINES, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/master-data/airline`,
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (response?.success) {
				yield put({
					type: __OK_LIST_MD_AIRLINES,
					payload: {
						...response,
						params: payload?.query,
						query: payload?.query,
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_AIRLINES
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_AIRLINES
			})
		}
	})
}

export function* _getMDListCity() {
	yield takeEvery(__GET_LIST_MD_CITY, function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/master-data/city`,
						config: {
							params: {
								...payload?.query
							}
						}
					}).get())
				})
			})
			
			if (response?.success) {
				yield put({
					type: __OK_LIST_MD_CITY,
					payload: {
						...response,
						params: payload?.query,
						query: payload?.query,
					}
				})
			} else {
				yield put({
					type: __BAD_LIST_MD_CITY
				})
			}
			
		} catch (err) {
			yield put({
				type: __BAD_LIST_MD_CITY
			})
		}
	})
}


export function* __getMDThinClientStatus() {
	yield takeEvery(REQUEST(GET_MD_THIN_CLIENT_STATUS), function* ({payload}) {
		try {
			const response = yield call(()=> {
          return new Promise((resolve)=> {
              resolve(new ApiService({
                  url:`/api/v1/master-data/thin-client-status`,
                  config: {
                      params: {
                          ...payload?.params
                      }
                  }
              }).get())
          })
      })
        
        if(response?.success){
            yield all([
              put({
                  type: SUCCESS(GET_MD_THIN_CLIENT_STATUS),
                  payload: {
                      ...response,
                      data: [ ...response?.data ],
                      pagination: {
                          ...response?.pagination,
                          ...response?.paginate
                      },
                  }
              })
            ])
        }else{
            yield all([
                put({
                    type: FAILURE(GET_MD_THIN_CLIENT_STATUS),
                    payload: {
                    
                    }
                })
            ])
        }
		} catch (err) {
			yield all([
				put({
            type: FAILURE(GET_MD_THIN_CLIENT_STATUS),
            payload: {
            
            }
        })
			])
		}
	})
}

export default function* rootSaga() {
	yield all([
		fork(_getMDListLocation),
		fork(_getMDListCity),
		fork(_getMDListAirlines),
		fork(_getMDListAirlinesStatus),
		fork(__getMDThinClientStatus),
		fork(_getMDListAirlinesTypes),
		fork(_getMDListThinClient),
	])
}