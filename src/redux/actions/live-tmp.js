import {CHANGE_LE_PREV_MODE, OK_SAVE_LE_TMP, POST_SAVE_LE_TMP} from "../constants/Live.template";

export const SaveLiveEditor = (body = {})=> {
    return {
        type: POST_SAVE_LE_TMP,
        body
    }
}

export const LeChangePrevMode = (preview = String)=> {
    return {
        type: CHANGE_LE_PREV_MODE,
        preview: preview
    }
}

export const SaveExitLiveEditor = (body = {})=> {
    return {
        type: OK_SAVE_LE_TMP,
        body
    }
}