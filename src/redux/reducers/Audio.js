import {AUDIO_PAUSE, AUDIO_PLAY, AUDIO_SELECT_AND_PLAY, AUDIO_STOP,PLAYER_CLOSED} from "../constants";

const initialState = {
    loading: false,
    isType: null,
    url: null,
    title:null,
}

export default function(state = initialState, action){
    switch (action.type){
        case PLAYER_CLOSED:
            return {
                ...state,
                loading:false,
                isType: null,
                url: null,
                title: null
            }
        case AUDIO_SELECT_AND_PLAY:
            return {
                ...state,
                loading:true,
                isType: "SELECTED",
                url:null,
                title: null,
            }
        case AUDIO_PLAY:
            return {
                ...state,
                loading:false,
                isType: "PLAY",
                ...action.payload
            }
        case AUDIO_STOP:
            return {
                ...state,
                loading:false,
                isType: "STOP",
                ...action.payload
            }
        case AUDIO_PAUSE:
            return {
                ...state,
                loading:false,
                isType: "PAUSE",
                ...action.payload
            }
        default:
            return state;
    }
}