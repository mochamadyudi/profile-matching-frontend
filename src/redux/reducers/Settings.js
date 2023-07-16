import {
    CONF_INITIAL_INVITATION,
    DESCRIBE_GLOBAL_LOADING_SCREEN, GET_SITE, SETTING_GENERAL_API,
    SUBSCRIBE_GLOBAL_LOADING_SCREEN
} from "../constants";
import Mutate from "../mutations";
import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";

const initialState = {
    loading: {
        screen: {
            primary: true
        }
    },
    site:{
        loading:true,
        key: 'site_name',
        data:null
    },
    collections: {
        general: {
            loading: true,
            data: [],
            params: {
                page:1,
                limit:10
            },
            pagination: {
                page:1,
                limit:10
            }
        }
    }
}

export default function (state = initialState, action) {
    let { payload } = action
    switch (action.type) {

        
        case REQUEST(GET_SITE):
            return {
                ...state,
                site: {
                    ...state.site,
                    loading: true,
                    data: null
                }
            }
        case SUCCESS(GET_SITE):
            console.log({payload})
            return {
                ...state,
                site: {
                    ...state.site,
                    loading: false,
                    ...payload,
                    data: payload?.data
                }
            }
        case FAILURE(GET_SITE):
            return {
                ...state,
                site: {
                    ...state.site,
                    loading: false,
                    data: null
                }
            }
        case REQUEST(SETTING_GENERAL_API):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    general: {
                        ...state.collections.general,
                        loading: true,
                        data: [],
                    }
                }
            }
        case SUCCESS(SETTING_GENERAL_API):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    general: {
                        ...state.collections.general,
                        loading: false,
                        ...action?.payload
                    }
                }
            }
        case FAILURE(SETTING_GENERAL_API):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    general: {
                        ...state.collections.general,
                        loading: false,
                        data: [],
                    }
                }
            }

        case CONF_INITIAL_INVITATION:
            return {
                ...state,
                isNew: true,
                loading: {
                    ...state.loading,
                    screen: {
                        ...state.loading.screen,
                        primary: false
                    }
                }
            }
        case SUBSCRIBE_GLOBAL_LOADING_SCREEN:
            return Mutate.subscribe.settings.primaryScreenLoading(state, action)
        case DESCRIBE_GLOBAL_LOADING_SCREEN:
            return Mutate.describe.settings.primaryScreenLoading(state, action)
        default:
            return state
    }
}