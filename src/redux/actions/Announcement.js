import {REQUEST} from "./action.type";
import {
    ANNOUNCEMENT_CATEGORY,
    CLOSE_PLAYER_ANNOUNCEMENT, GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST,
    GET_ANNOUNCEMENT_GLOBAL_PLAYLIST,
    GET_ANNOUNCEMENT_SHOW_PLAYLIST, MINIFY_PLAYER_ANNOUNCEMENT,
    OPEN_PLAYER_ANNOUNCEMENT
} from "../constants/Announcement";

export function __AnGlobalPlaylist(payload = {}){
    return{
        type: REQUEST(GET_ANNOUNCEMENT_GLOBAL_PLAYLIST),
        payload
    }
}

/**
 * @param payload
 * @returns {{payload: {}, type: string}}
 */
export function __AnShowPlaylist(payload = {}){
    return{
        type: REQUEST(GET_ANNOUNCEMENT_SHOW_PLAYLIST),
        payload
    }
}


/**
 *
 * @param {object} payload
 * @returns {{payload, type: string}}
 */
export function __AnOpenPlayer(payload){
    return {
        type:REQUEST(OPEN_PLAYER_ANNOUNCEMENT),
        payload
    }
}

/**
 * @param payload
 * @returns {{payload, type: string}}
 */
export function __AnClosePlayer(payload){
    return {
        type:REQUEST(CLOSE_PLAYER_ANNOUNCEMENT),
        payload
    }
}

/**
 * @param {boolean} payload
 * @returns {{payload, type: string}}
 */
export function __AnIsMinify(payload = false){
    return {
        type: REQUEST(MINIFY_PLAYER_ANNOUNCEMENT),
        payload
    }
}


/**
 *
 * @param {object} payload
 * @param {number} payload.page
 * @param {number} payload.limit
 * @returns {{payload, type: string}}
 */
export function __getAnCategory(payload){
    return {
        type: REQUEST(ANNOUNCEMENT_CATEGORY),
        payload
    }
}

/**
 * @param {object} payload
 * @param {number} payload.page
 * @param {number} payload.limit
 * @returns {{payload, type: string}}
 */
export function __getAnCategorySelectionsList(payload){
    return {
        type: REQUEST(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST),
        payload
    }
}