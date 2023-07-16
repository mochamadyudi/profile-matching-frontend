import {AUDIO_PAUSE, AUDIO_PLAY, AUDIO_SELECT_AND_PLAY,PLAYER_CLOSED, AUDIO_STOP} from "../constants";

export const SelectAudioAndPlay = (payload)=> {
    return {
        type: AUDIO_SELECT_AND_PLAY,
        payload
    }
}
export const AudioPlay = (payload)=> {
    return {
        type:AUDIO_PLAY,
        payload
    }
}

export const AudioStop = (payload)=> {
    return {
        type:AUDIO_STOP,
        payload
    }
}

export const AudioPause = (payload)=> {
    return {
        type:AUDIO_PAUSE,
        payload
    }
}

export const PlayerClosed = ()=> {
    return {
        type: PLAYER_CLOSED
    }
}


