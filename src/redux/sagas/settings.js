import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import axios from 'axios'
import {
	BAD_GET_LIST_INVITATIONS_SETTING,
	CONF_BAD_INITIAL_INVITATION,
	CONF_INITIAL_INVITATION,
	CONF_OK_INITIAL_INVITATION,
	CONF_SET_INITIAL_INVITATION,
	DESCRIBE_EMIT_CURRENT_INVITATION,
	DESCRIBE_GLOBAL_LOADING_SCREEN,
	EMIT_CURRENT_ACTIVE_INVITATION,
	GET_LIST_INVITATIONS_SETTING, GET_SITE,
	OK_GET_LIST_INVITATIONS_SETTING, SETTING_GENERAL_API
} from "../constants";
import {SubscribeGlobalScreen} from "../actions/Settings";
import {message} from "antd";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import ApiService from "../../services/api.service";


export function* _getSite(){
	yield takeEvery(REQUEST(GET_SITE), function*({payload}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(new ApiService({
						url:`/api/v1/options/${payload?.key ?? "site_name"}`,
						mode:"express"
					}).get())
				})
			})
			
			console.log({response},'EXPRESS')
			if(!response?.error && response?.data){
				yield all([
					put({
						type: SUCCESS(GET_SITE),
						payload: {
							...response?.data,
							data:response?.data?.opt_value
						}
					})
				])
			}else{
				yield all([
					put({
						type:FAILURE(GET_SITE)
					})
				])
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(GET_SITE)
				})
			])
		}
	})
}
export function* _getGeneralSetting() {
	yield takeEvery(REQUEST(SETTING_GENERAL_API), function* ({payload}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(new ApiService({
						url: `/api/v1/setting/general`,
						config: {
							params: {
								...payload?.params
							}
						}
					}).get()
						.then((response)=> response)
						.catch((err)=> err))
				})
			})
			console.log({response})
			console.log({success:response?.success})
			yield all([
				put({
					type: SUCCESS(SETTING_GENERAL_API),
					payload: {
						data:response?.data ?? [],
						pagination: {
							...response?.pagination,
							...response?.paginate
						},
						params: {
							...response?.params
						}
					}
				})
			])
			
		} catch (err) {
			yield all([
				put({
					type: FAILURE(SETTING_GENERAL_API),
				})
			])
		}
	})
}

export function* _SGetListInvitation() {
	yield takeEvery(GET_LIST_INVITATIONS_SETTING, function* ({}) {
		try {
			const response = yield call(() => {
				return new Promise((resolve) => {
					resolve(axios.get('/invitations-list.json')
						.then((response) => {
							return {
								error: false,
								pagination: {},
								params: {},
								data: response?.data ?? []
							}
						})
						.catch((err) => {
							return {
								error: true,
								pagination: {},
								params: {},
								data: []
							}
						}))
				})
			})
			
			if (response?.error) {
				yield all([
					put({
						type: BAD_GET_LIST_INVITATIONS_SETTING
					})
				])
			} else {
				if (Array.isArray(response?.data) && response?.data.length > 0) {
					yield all([
						put({
							type: OK_GET_LIST_INVITATIONS_SETTING,
							payload: response
						})
					])
				} else {
					yield all([
						put({
							type: BAD_GET_LIST_INVITATIONS_SETTING,
						}),
						put({
							type: CONF_INITIAL_INVITATION
						})
					])
				}
			}
		} catch (err) {
			yield all([
				put({
					type: BAD_GET_LIST_INVITATIONS_SETTING
				})
			])
		}
	})
}


export function* _NewConfInvitation() {
	yield takeEvery(CONF_SET_INITIAL_INVITATION, function* ({}) {
		let key = 'updatable-initial'
		try {
			message.loading({
				content: "Loading...",
				duration: 4,
				key
			})
			const response = yield call(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve({
							"id": 1,
							"status": "premium",
							"title": "Mileea & Dilan Wedding"
						},)
					}, 3000)
				})
			})
			if (response) {
				message.success({
					content: "Successfully",
					duration: 4,
					key
				})
				yield all([
					put({
						type: CONF_OK_INITIAL_INVITATION,
						payload: response
					})
				])
			} else {
				message.error({
					content: "Some Error",
					duration: 4,
					key
				})
				yield all([
					put({
						type: CONF_BAD_INITIAL_INVITATION
					})
				])
			}
		} catch (err) {
			message.error({
				content: err?.message ?? "Some Error",
				duration: 4,
				key
			})
			yield all([
				put({
					type: CONF_BAD_INITIAL_INVITATION
				})
			])
		}
	})
}

export function* _emitCurrentActive() {
	yield takeEvery(EMIT_CURRENT_ACTIVE_INVITATION, function* ({payload}) {
		try {
			yield all([
				put(SubscribeGlobalScreen()),
				put({
					type: DESCRIBE_EMIT_CURRENT_INVITATION,
					payload
				})
			])
		} catch (err) {
			yield put({
				type: DESCRIBE_GLOBAL_LOADING_SCREEN
			})
		}
	})
}

export default function* rootSaga() {
	yield all([
		fork(_getSite),
		fork(_NewConfInvitation),
		fork(_getGeneralSetting),
		fork(_SGetListInvitation),
		fork(_emitCurrentActive),
	])
}