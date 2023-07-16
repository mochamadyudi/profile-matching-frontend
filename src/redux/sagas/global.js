import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
} from "../constants/Display";
import ApiService from "../../services/api.service";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {LIST_CRITERIA, LIST_USER_CRITERIA, SHOW_TRAVEL} from "../constants";

export function* _getTravelShow(){
	yield takeEvery(REQUEST(SHOW_TRAVEL), function*({payload}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(new ApiService({
						url:`/api/v1/travel/${payload?.id}`,
						config:{
							params: {
								...payload?.params
							}
						}
					}).get())
				})
			})
			
			if(!response?.error){
				yield all([
					put({
						type: SUCCESS(SHOW_TRAVEL),
						payload: {
							...response
						}
					}),
					put({
						type: REQUEST(LIST_CRITERIA),
						payload: {
							params: {
								travelId: response?.data?.id ?? null,
								...payload?.params
							}
						}
					})
				])
			}else{
				yield all([
					put({
						type: FAILURE(SHOW_TRAVEL)
					})
				])
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(SHOW_TRAVEL)
				})
			])
		}
	})
}


export function* _getTravelShowCriteriaList(){
	yield takeEvery(REQUEST(LIST_CRITERIA), function*({payload}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(
						new ApiService({
							url:`/api/v1/criteria`,
							config: {
								params: {
									...payload?.params
								}
							}
						}).get()
					)
				})
			})
			
			if(!response?.error){
				yield all([
					put({
						type: SUCCESS(LIST_CRITERIA),
						payload: {
							...response
						}
					}),
					put({
						type: REQUEST(LIST_USER_CRITERIA),
						payload: {
							params: {
								criteriaId: response?.data?.map((item)=> item?.id),
								...payload?.params
							}
						}
					})
				])
			}else{
				yield all([
					put({
						type: FAILURE(LIST_CRITERIA)
					})
				])
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(LIST_CRITERIA)
				})
			])
		}
	})
}
export function* _getTravelShowCriteriaUser(){
	yield takeEvery(REQUEST(LIST_USER_CRITERIA), function*({payload}){
		try{
			const response = yield call(()=> {
				return new Promise((resolve)=> {
					resolve(
						new ApiService({
							url:`/api/v1/criteria/user`,
							config: {
								params: {
									...payload?.params
								}
							}
						}).get()
					)
				})
			})
			
			if(!response?.error){
				yield all([
					put({
						type: SUCCESS(LIST_USER_CRITERIA),
						payload: {
							...response
						}
					})
				])
			}else{
				yield all([
					put({
						type: FAILURE(LIST_USER_CRITERIA)
					})
				])
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(LIST_USER_CRITERIA)
				})
			])
		}
	})
}
export default function* rootSaga() {
	yield all([
		fork(_getTravelShow),
		fork(_getTravelShowCriteriaList),
		fork(_getTravelShowCriteriaUser),
	])
}