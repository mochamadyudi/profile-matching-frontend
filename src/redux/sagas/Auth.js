import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK, USER_LOAD, BAD_USER_LOAD, OK_USER_LOAD, AUTH_UPDATE_PROFILE
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
	signUpSuccess,
	signInWithGoogleAuthenticated,
	signInWithFacebookAuthenticated
} from "../actions/Auth";

import FirebaseService from 'services/FirebaseService'
import Utils from "../../utils";
import {message} from "antd";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import ApiService from "../../services/api.service";
import {GetGeneralSetting, getSite} from "../actions/Settings";

async function fakeFetching (){
	let timeout
	let response = {}
	timeout = setTimeout(()=> {
		Reflect.set(response,'token',Utils.getToken('get'))
	},3000)
	clearTimeout(timeout)
	return response
}

export function* _updateProfile(){
	yield takeEvery(REQUEST(AUTH_UPDATE_PROFILE), function*({payload}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(new ApiService({
						url:`/api/v1/profile/edit`,
						mode:'express',
						body:payload
					}).post())
				})
			})
			if(!response?.error){
				yield all([
					put({
						type: SUCCESS(AUTH_UPDATE_PROFILE),
						payload: {
							...response?.data
						}
					})
				])
			}else{
				yield all([
					put({
						type: FAILURE(AUTH_UPDATE_PROFILE)
					})
				])
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(AUTH_UPDATE_PROFILE)
				})
			])
		}
	})
}


export function* _userLoad(){
	yield takeEvery(REQUEST(USER_LOAD), function*({}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(new ApiService({
						url:`/api/v1/auth/load-user`,
						mode:'express',
					}).get())
				})
			})
			let payload = {
				isAuthenticated: true,
				token:Utils.getToken('get'),
				profile: {}
			}
			
			
			
			if(!Utils.getToken('get')){
				Reflect.set(payload,"isAuthenticated",false)
				Reflect.set(payload,"token",null)
				Reflect.set(payload,"profile",{})
			}
			
			
			if(!response?.error){
				Reflect.set(payload,'profile',response?.data)
				yield all([
					put(GetGeneralSetting({
						params: {
							page:1,
							limit:200
						}
					})),
					put(getSite()),
					put({
						type: SUCCESS(USER_LOAD),
						payload:payload
					})
				])
			}else{
				yield all([
					put({
						type: FAILURE(USER_LOAD),
						payload:null
					}),
					put(getSite())
				])
			}
		}catch(err){
			yield put({
				type: BAD_USER_LOAD
			})
		}
	})
}
export function* signInWithFBEmail() {
  yield takeEvery(SIGNIN, function* ({payload}) {
		const {email, password} = payload;
		try {
			const user = yield call(FirebaseService.signInEmailRequest, email, password);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(authenticated(user.user.uid));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
		try {
			const signOutUser = yield call(FirebaseService.signOutRequest);
			if (signOutUser === undefined) {
				localStorage.removeItem(AUTH_TOKEN);
				yield put(signOutSuccess(signOutUser));
			} else {
				yield put(showAuthMessage(signOutUser.message));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* signUpWithFBEmail() {
  yield takeEvery(SIGNUP, function* ({payload}) {
		const {email, password} = payload;
		try {
			const user = yield call(FirebaseService.signUpEmailRequest, email, password);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signUpSuccess(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	}
	);
}

export function* signInWithFBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
		try {
			const user = yield call(FirebaseService.signInGoogleRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithGoogleAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
		try {
			const user = yield call(FirebaseService.signInFacebookRequest);
			if (user.message) {
				yield put(showAuthMessage(user.message));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.user.uid);
				yield put(signInWithFacebookAuthenticated(user.user.uid));
			}
		} catch (error) {
			yield put(showAuthMessage(error));
		}
	});
}

export default function* rootSaga() {
  yield all([
		fork(signInWithFBEmail),
		fork(signOut),
		fork(_updateProfile),
		fork(_userLoad),
		fork(signUpWithFBEmail),
		fork(signInWithFBGoogle),
		fork(signInWithFacebook)
  ]);
}
