import {
    DESCRIBE_GLOBAL_LOADING_SCREEN,
    EMIT_CURRENT_ACTIVE_INVITATION,
    GET_LIST_INVITATIONS_SETTING, GET_SITE, SETTING_GENERAL_API,
    SUBSCRIBE_GLOBAL_LOADING_SCREEN
} from "../constants/Settings";
import {REQUEST} from "./action.type";

export const GetInvitationsInSettings = (params = {})=> {
    return {
        type:GET_LIST_INVITATIONS_SETTING,
        payload: params
    }
}

export const EmitCurrentInvitation = (value = {})=> {
    return {
        type: EMIT_CURRENT_ACTIVE_INVITATION,
        payload: value
    }
}


export function GetGeneralSetting(payload = {}){
    return {
        type: REQUEST(SETTING_GENERAL_API),
        payload
    }
}
export const SubscribeGlobalScreen = ()=> ({type:SUBSCRIBE_GLOBAL_LOADING_SCREEN})
export const DescribeGlobalScreen = ()=> ({type:DESCRIBE_GLOBAL_LOADING_SCREEN})


export function getSite(){
    return {
        type: REQUEST(GET_SITE),
    }
}