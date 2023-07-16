import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {SWITCH_THEME} from "../constants";
import {FAILURE} from "../actions/action.type";

export function* themeModeConfiguration(){
	yield takeEvery(SWITCH_THEME, function*({currentTheme}){
		try{
			console.log({currentTheme})
			if(localStorage.getItem('THEME_MODE')){
				localStorage.setItem('THEME_MODE',currentTheme)
			}else{
				localStorage.setItem('THEME_MODE',currentTheme ?? "light")
			}
		}catch(err){
			yield all([
				put({
					type: FAILURE(SWITCH_THEME),
					currentTheme: false
				})
			])
		}
	})
}
export default function* rootSaga(){
	yield([
		fork(themeModeConfiguration)
	])
}