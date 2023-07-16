import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_SEND
} from "../constants/WebSocketConstants";

let userId = localStorage.getItem('userId') ?? null
export const SocketConnect = (url = `/ws/${userId}`)=> {
    let newUrl = ["ws://",process.env.REACT_APP_HOST_SOCKET,url].join("")
    return {
        type: WEBSOCKET_CONNECT,
        payload:{ url: newUrl }
    }
}

export const SocketSend = (payload)=> ({
    type: WEBSOCKET_SEND,
    payload
})

export const SocketMessage = (payload)=> ({
    type:WEBSOCKET_MESSAGE,
    payload,
})

export const SocketDisconnect = (payload)=> ({
    type: WEBSOCKET_DISCONNECT,
    payload
})