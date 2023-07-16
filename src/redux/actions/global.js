import {LIST_CRITERIA, LIST_USER_CRITERIA, SHOW_TRAVEL} from "../constants";
import {REQUEST} from "./action.type";

export function getGlobalTravel(payload = {}){
	return {
		type: REQUEST(SHOW_TRAVEL),
		payload
	}
	
}
export function getGlobalTravelCriteria(payload = {}){
	return {
		type: REQUEST(LIST_CRITERIA),
		payload
	}
	
}
export function getGlobalTravelCriteriaUser(payload = {}){
	return {
		type: REQUEST(LIST_USER_CRITERIA),
		payload
	}
	
}