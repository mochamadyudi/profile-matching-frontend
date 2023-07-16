import {FAILURE, REQUEST, SUCCESS} from "../actions/action.type";
import {
    CLEAR_ANNOUNCEMENT,
    CLOSE_PLAYER_ANNOUNCEMENT, GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST,
    GET_ANNOUNCEMENT_GLOBAL_PLAYLIST,
    GET_ANNOUNCEMENT_SHOW_PLAYLIST, MINIFY_PLAYER_ANNOUNCEMENT,
    OPEN_PLAYER_ANNOUNCEMENT,
    QUEUE_NEXT_MUSIC_ANNOUNCEMENT,
    QUEUE_NEXT_MUSIC_LANG_ANNOUNCEMENT,
    SELECT_ANNOUNCEMENT
} from "../constants/Announcement";

const initialState = {
    options: {
        isOpen: false,
        isMinify: false,
        isFullscreen: false,
    },
    player: {
        loading: true,
        isPause:false,
        isPlay:false,
        isType: null, // 'STOP' | 'PAUSE' | 'PLAY' | 'SELECTED'
        data: null,
    },
    collections : {
        show: {
            loading: true,
            params: {},
            data: []
        },
        playlist: {
            loading: true,
            params: {

            },
            data: []
        },
        category:{
            select:{
                loading: true,
                params: {},
                data: []
            },
            show: {
                loading: true,
                params: {},
                data: []
            },
            lists: {
                loading: true,
                params: {},
                pagination: {
                    page:1,
                    limit:20,
                    total_items:0
                },
                data: []
            }
        }
    }
}

export default function(state = initialState, action){
    let { type , payload } = action
    switch (type){

        case REQUEST(MINIFY_PLAYER_ANNOUNCEMENT):
            return {
                ...state,
                options: {
                    ...state.options,
                    isMinify: payload
                }
            }

        case REQUEST(SELECT_ANNOUNCEMENT):
            return {
                ...state,
                player: {
                    ...state.player,
                    isType: "SELECTED",
                    loading: true,
                    data: null
                }
            }
        case SUCCESS(SELECT_ANNOUNCEMENT):
            return {
                ...state,
                player: {
                    ...state.player,
                    isType: "SUCCESS-SELECTED",
                    loading: false,
                    data: payload?.data
                }
            }
        case FAILURE(SELECT_ANNOUNCEMENT):
            return {
                ...state,
                player: {
                    ...state.player,
                    loading: false,
                    data: null
                }
            }
        case REQUEST(CLEAR_ANNOUNCEMENT):
        case REQUEST(OPEN_PLAYER_ANNOUNCEMENT):
            return {
                ...state,
                options: {
                    ...state.options,
                    isOpen: true
                }
            }
        case REQUEST(CLOSE_PLAYER_ANNOUNCEMENT):
            return {
                ...state,
                ...initialState,
                options: {
                    ...state.options,
                    isOpen: false
                }
            }
        case REQUEST(QUEUE_NEXT_MUSIC_ANNOUNCEMENT):
        case REQUEST(QUEUE_NEXT_MUSIC_LANG_ANNOUNCEMENT):

        case REQUEST(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    category: {
                        ...state.collections.category,

                    }
                }
            }
        case SUCCESS(GET_ANNOUNCEMENT_CATEGORY_SELECTIONS_LIST):
            return {
                ...state,
                collections: {
                    ...state.collections,
                    category: {
                        ...state.collections.category,
                        select: {
                            ...state.collections.category.select,
                            loading: false,
                            params :{
                                ...action?.payload?.params
                            },
                            pagination: {
                                ...state.collections.category.select.pagination,
                                ...action?.payload?.pagination
                            },
                            data: [
                                ...action?.payload?.data
                            ]
                        }
                    }
                }
            }

        case REQUEST(GET_ANNOUNCEMENT_GLOBAL_PLAYLIST):
        case SUCCESS(GET_ANNOUNCEMENT_GLOBAL_PLAYLIST):
        case FAILURE(GET_ANNOUNCEMENT_GLOBAL_PLAYLIST):

        case REQUEST(GET_ANNOUNCEMENT_SHOW_PLAYLIST):
        case SUCCESS(GET_ANNOUNCEMENT_SHOW_PLAYLIST):
        case FAILURE(GET_ANNOUNCEMENT_SHOW_PLAYLIST):

        default:
            return state
    }
}