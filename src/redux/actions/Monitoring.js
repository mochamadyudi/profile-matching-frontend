import {GET_MONITORING_LIST} from "../constants/Monitoring";

export function _GetMonitoring(payload = {}){
    return {
        type: GET_MONITORING_LIST,
        payload
    }
}