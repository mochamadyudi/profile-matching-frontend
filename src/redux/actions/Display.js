import {
    __DELETE_DISPLAY_SYSTEM_IN_LIST,
    __GET_LIST_DISPLAY_SYSTEM,
    __GET_SHOW_DISPLAY_SYSTEM,
    __POST_DISPLAY_SYSTEM
} from "../constants/Display";


export const GET_LIST_DISPLAY_SYSTEM = (payload = { })=> {
    return {
        type:__GET_LIST_DISPLAY_SYSTEM,
        payload
    }
}
export const GET_SHOW_DISPLAY_SYSTEM = (payload = { })=> {
    return {
        type:__GET_SHOW_DISPLAY_SYSTEM,
        payload
    }
}
export const POST_DISPLAY_SYSTEM = (payload = { })=> {
    return {
        type:__POST_DISPLAY_SYSTEM,
        payload
    }
}
export const DELETE_DISPLAY_SYSTEM_IN_LIST = (payload = { })=> {
    return {
        type:__DELETE_DISPLAY_SYSTEM_IN_LIST,
        payload
    }
}