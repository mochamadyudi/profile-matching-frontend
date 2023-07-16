import {eventChannel} from 'redux-saga';
import {call, put, take, takeEvery} from 'redux-saga/effects';
import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_SEND
} from "../constants/WebSocketConstants";
import {message, notification} from "antd";
import {GET_MONITORING_LIST, SET_HIGHLIGHT_MONITORING} from "../constants/Monitoring";
import {_setHighlightMonitoring} from "./Monitoring";

function createWebSocketChannel(socket) {
    return eventChannel((emit) => {
        const onOpen = () => {
            emit({
                type: "open"
            })
        }
        const onClose = () => {
            emit({
                type: "close"
            })
        }

        const onMessage = (event) => {
            emit({
                type: 'message',
                payload: event.data
            })
        }


        socket.addEventListener('open',onOpen);
        socket.addEventListener('close',onClose);
        socket.addEventListener('message',onMessage);

        const unSubscribe = ()=> {

            socket.removeEventListener('open',onOpen);
            socket.removeEventListener('close',onClose);
            socket.removeEventListener('message',onMessage);
        }

        return unSubscribe;
    })
}

function* webSocketSaga ({payload: {url }}){
    const socket = new WebSocket(url);
    const channel = yield call(createWebSocketChannel,socket);

    yield takeEvery(WEBSOCKET_SEND, function*({payload}){
        message.loading({
            content:"Loading...",
            key:'websocket',
            duration:5
        })
        socket.send(payload)
    })



    while(true){
        const {type,payload} = yield take(channel);
        switch (type){
            case "open":
                message.success({
                    content:"WebSocket connection opened",
                    duration:2
                })
                // console.log('WebSocket connection opened')
                break;
            case "close":
                message.error({
                    content:"Websocket Connection closed",
                    key:'websocket',
                    duration:2
                })
                // console.log('Websocket Connection closed');
                break;
            case "message":
                let newPayload
                try{
                    newPayload = JSON.parse(payload)
                }catch(err){
                    newPayload = null
                }
                if(newPayload){
                    console.log({newPayload})
                    yield put({
                        type:SET_HIGHLIGHT_MONITORING,
                        payload:newPayload
                    })
                }else{
                    message.info({
                        content:payload,
                        key:'websocket',
                        duration:2
                    })
                }



                yield put({
                    type:WEBSOCKET_MESSAGE,
                    payload
                });
                break;
            default:
                break;
        }
    }
}


function* websocketDisconnectSaga() {
    // Close the WebSocket connection
}
export default function* rootSaga(){
    yield takeEvery(WEBSOCKET_CONNECT,webSocketSaga);
    yield takeEvery(WEBSOCKET_DISCONNECT, websocketDisconnectSaga);
}