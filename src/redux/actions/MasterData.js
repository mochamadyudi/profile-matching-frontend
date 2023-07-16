import {
    __DELETE_MD_AIRLINES_IN_LIST,
    __DELETE_MD_AIRLINES_STATUS_IN_LIST, __DELETE_MD_AIRLINES_TYPE_IN_LIST, __DELETE_MD_CITY_IN_LIST,
    __DELETE_MD_LOCATION_IN_LIST,
    __DELETE_MD_THIN_CLIENT_IN_LIST, __GET_LIST_MD_AIRLINES,
    __GET_LIST_MD_AIRLINES_STATUS,
    __GET_LIST_MD_AIRLINES_TYPE, __GET_LIST_MD_CITY,
    __GET_LIST_MD_LOCATION,
    __GET_LIST_MD_THIN_CLIENT, __GET_SHOW_MD_AIRLINES,
    __GET_SHOW_MD_AIRLINES_STATUS, __GET_SHOW_MD_AIRLINES_TYPE, __GET_SHOW_MD_CITY,
    __GET_SHOW_MD_LOCATION,
    __GET_SHOW_MD_THIN_CLIENT, __POST_MD_AIRLINES,
    __POST_MD_AIRLINES_STATUS, __POST_MD_AIRLINES_TYPE, __POST_MD_CITY,
    __POST_MD_LOCATION,
    __POST_MD_THIN_CLIENT, GET_MD_THIN_CLIENT_STATUS,
} from "../constants/MasterData";
import {REQUEST} from "./action.type";


/**
 * =================================================================
 * MASTER DATA - CITY
 * =================================================================
 */
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_CITY = (payload)=> {
    return {
        type:__GET_LIST_MD_CITY,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_CITY = (payload)=> {
    return {
        type:__GET_SHOW_MD_CITY,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_CITY = (payload)=> {
    return {
        type:__POST_MD_CITY,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_CITY_IN_LIS = (payload)=> {
    return {
        type:__DELETE_MD_CITY_IN_LIST,
        payload
    }
}




/**
 * =================================================================
 * MASTER DATA - LOCATION
 * =================================================================
 */
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_LOCATION = (payload)=> {
    return {
        type:__GET_LIST_MD_LOCATION,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_LOCATION = (payload)=> {
    return {
        type:__GET_SHOW_MD_LOCATION,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_LOCATION = (payload)=> {
    return {
        type:__POST_MD_LOCATION,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_LOCATION_IN_LIS = (payload)=> {
    return {
        type:__DELETE_MD_LOCATION_IN_LIST,
        payload
    }
}


/**
 * =================================================================
 * MASTER DATA - THIN CLIENT
 * =================================================================
 */


/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_THIN_CLIENT = (payload)=> {
    return {
        type:__GET_LIST_MD_THIN_CLIENT,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_THIN_CLIENT = (payload)=> {
    return {
        type:__GET_SHOW_MD_THIN_CLIENT,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_THIN_CLIENT = (payload)=> {
    return {
        type:__POST_MD_THIN_CLIENT,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_THIN_CLIENT_IN_LIS = (payload)=> {
    return {
        type:__DELETE_MD_THIN_CLIENT_IN_LIST,
        payload
    }
}




/**
 * =================================================================
 * MASTER DATA - AIRLINES
 * =================================================================
 */


/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_AIRLINES = (payload)=> {
    return {
        type:__GET_LIST_MD_AIRLINES,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_AIRLINES = (payload)=> {
    return {
        type:__GET_SHOW_MD_AIRLINES,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_AIRLINES = (payload)=> {
    return {
        type:__POST_MD_AIRLINES,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_AIRLINES_IN_LIST = (payload)=> {
    return {
        type:__DELETE_MD_AIRLINES_IN_LIST,
        payload
    }
}






/**
 * =================================================================
 * MASTER DATA - AIRLINES STATUS
 * =================================================================
 */


/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_AIRLINES_STATUS = (payload)=> {
    return {
        type:__GET_LIST_MD_AIRLINES_STATUS,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_AIRLINES_STATUS = (payload)=> {
    return {
        type:__GET_SHOW_MD_AIRLINES_STATUS,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_AIRLINES_STATUS = (payload)=> {
    return {
        type:__POST_MD_AIRLINES_STATUS,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_AIRLINES_STATUS_IN_LIST = (payload)=> {
    return {
        type:__DELETE_MD_AIRLINES_STATUS_IN_LIST,
        payload
    }
}



/**
 * =================================================================
 * MASTER DATA - AIRLINES STATUS
 * =================================================================
 */


/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_LIST_MD_AIRLINES_TYPE = (payload)=> {
    return {
        type:__GET_LIST_MD_AIRLINES_TYPE,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const GET_SHOW_MD_AIRLINES_TYPE = (payload)=> {
    return {
        type:__GET_SHOW_MD_AIRLINES_TYPE,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{type: string}}
 */
export const POST_MD_AIRLINES_TYPE = (payload)=> {
    return {
        type:__POST_MD_AIRLINES_TYPE,
        payload
    }
}
/**
 * @function
 * @param {Object|Array|String} payload
 * @returns {{T: *, type: string}}
 */
export const DELETE_MD_AIRLINES_TYPE_IN_LIST = (payload)=> {
    return {
        type:__DELETE_MD_AIRLINES_TYPE_IN_LIST,
        payload
    }
}


export function ACTION_MD_THIN_STATUS (payload){
    return {
        type: REQUEST(GET_MD_THIN_CLIENT_STATUS),
        payload
    }
}





